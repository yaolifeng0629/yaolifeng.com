/* eslint-disable */
// @ts-nocheck
import type { BytemdPlugin } from 'bytemd';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import { visit } from 'unist-util-visit';

import { copyToClipboard, isBrowser } from '@/utils/utils';

// 高性能配置
const highPerformanceConfig = {
    decoding: 'auto',
    fetchpriority: 'high',
    loading: 'eager',
};

// 低性能配置
const lowPerformanceConfig = {
    decoding: 'async',
    fetchpriority: 'low',
    loading: 'lazy',
};

const copyBtnNode = fromHtmlIsomorphic(`
<div class="copy-code-button group">
  <div class="copy-tooltip">复制代码</div>
  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy transition-colors group-hover:stroke-primary"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
</div>
`);

const clipboardCheckIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-primary"><polyline points="20 6 9 17 4 12"/></svg>`;
const successTip = `<span class="success-tip text-xs text-primary">已复制</span>`;

/**
 * 插件功能
 * 1. 显示代码类型
 * 2. 增加复制代码按钮
 * 3. 优化复制交互体验
 * 4. 添加代码语言显示
 */
export const codeBlockPlugin = (): BytemdPlugin => {
    return {
        rehype: (process) =>
            process.use(() => (tree) => {
                visit(tree, 'element', (node) => {
                    if (node.tagName === 'pre') {
                        // Add copy button and language indicator
                        node.properties.className = `${node.properties.className || ''} relative group/code`.trim();
                        node.children.push(copyBtnNode);
                    }

                    visit(tree, 'element', (code, idx, parent) => {
                        if (code.tagName === 'code') {
                            const language = code.properties?.className
                                ?.filter((cs) => cs.startsWith('language'))[0]
                                ?.split('-')[1]
                                ?.split(':')[0];

                            if (language && !parent.properties['data-language']) {
                                parent.properties['data-language'] = language;
                            }
                        }
                    });
                });
            }),

        viewerEffect({ markdownBody }) {
            // 针对 SSR 场景适配
            if (!isBrowser()) {
                return;
            }

            const elements = markdownBody.querySelectorAll('.copy-code-button');
            for (const element of elements) {
                // 点击按钮复制代码到粘贴板
                element.addEventListener('click', () => {
                    const preElement = element.parentElement;
                    if (!preElement) return;

                    const codeElement = preElement.querySelector('code');
                    if (!codeElement) return;

                    let codeText = codeElement.textContent ?? '';
                    // 复制代码时去除开头的$符号，然后trim一下，一般是复制shell命令的代码块会用到
                    if (codeText.startsWith('$')) {
                        codeText = codeText.slice(1).trim();
                    }
                    copyToClipboard(codeText);

                    const tmp = element.innerHTML;
                    element.innerHTML = `<div class="flex items-center gap-1">${clipboardCheckIcon}${successTip}</div>`;

                    // 使用 requestAnimationFrame 优化性能
                    let rafId: number;
                    const resetButton = () => {
                        rafId = requestAnimationFrame(() => {
                            element.innerHTML = tmp;
                            cancelAnimationFrame(rafId);
                        });
                    };

                    setTimeout(resetButton, 1500);
                });
            }
        }
    };
};
