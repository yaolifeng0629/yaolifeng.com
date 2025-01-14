import * as Tags from './tag';

export interface TagCategory {
  name: string;
  tags: string[];
}

export const tagCategories: TagCategory[] = [
  {
    name: '前端框架',
    tags: [Tags.REACT, Tags.VUE, Tags.ANGULAR, Tags.NEXTJS, Tags.NUXTJS],
  },
  {
    name: '基础技术',
    tags: [Tags.HTML, Tags.CSS, Tags.JAVASCRIPT, Tags.TYPESCRIPT],
  },
  {
    name: '样式与设计',
    tags: [Tags.SASS, Tags.LESS, Tags.UI_UX, Tags.RESPONSIVE_DESIGN, Tags.ANIMATION],
  },
  {
    name: '构建与工具',
    tags: [Tags.WEBPACK, Tags.VITE, Tags.BUILD_TOOLS, Tags.CI_CD],
  },
  {
    name: '后端与API',
    tags: [Tags.NODEJS, Tags.EXPRESS, Tags.REST_API, Tags.GRAPHQL, Tags.WEBSOCKETS],
  },
  {
    name: '状态管理',
    tags: [Tags.REDUX, Tags.VUEX, Tags.STATE_MANAGEMENT],
  },
  {
    name: '性能与优化',
    tags: [Tags.PERFORMANCE, Tags.PROGRESSIVE_WEB_APPS, Tags.CODE_QUALITY],
  },
  {
    name: '开发运维',
    tags: [Tags.GIT, Tags.DOCKER, Tags.DEVOPS, Tags.VERSION_CONTROL],
  },
  {
    name: '图形与动画',
    tags: [Tags.SVG, Tags.CANVAS, Tags.WEBGL],
  },
  {
    name: '其他',
    tags: [
      Tags.SECURITY,
      Tags.SEO,
      Tags.WEB_COMPONENTS,
      Tags.BROWSER_APIS,
      Tags.HTTP,
      Tags.TESTING,
      Tags.MOBILE_DEVELOPMENT,
      Tags.CROSS_PLATFORM,
    ],
  },
];
