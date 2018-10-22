/**
 * 路由文件
 */
import { Root, ImgList, Home, RecordSplit } from './defined'
const HomeView = () => import('@/views/main')
const ImgListView = () => import('@/views/components/picList/index1')
const RecordSplitView = () => import('@/views/main-split')

export const RouterList = [
  {
    path: Root,
    redirect: Home,
    exact: true
  },
  {
    path: Home,
    name: 'Home',
    component: HomeView,
    exact: true
  },
  {
    path: ImgList,
    name: 'ImgList',
    component: ImgListView,
    exact: true
  },
  {
    path: RecordSplit,
    name: 'RecordSplit',
    component: RecordSplitView,
    exact: true
  }
]
export default RouterList
