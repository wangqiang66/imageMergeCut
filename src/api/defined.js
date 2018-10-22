/**
 * @type {{login: string}}
 * url 协议定义
 */

const defineApi = {
  'get_ocr_credit_info': '/ddcredit/qc/query/${writeType}/getReport/${taskId}/${subTaskId}',
  // 查询是否存编号
  'existReportNo': '/ddcredit/qc/query/queryReadyReport/${reportNo}',
  // 查询报告
  'queryReportByNo': '/ddcredit/qc/query/updateReportCache/${taskId}/${reportNo}',
  'save_ocr_credit_info': '/ddcredit/qc/save/write/getReport/${taskId}',
  'submit_ocr_credit_info': '/ddcredit/qc/submit/write/getReport/${taskId}',
  // 获取图片列表
  'get_img_list': '/ddcredit/qc/query/getReportImage/${subTaskId}',
  // 截图识别
  'clip_slot': '/ddcredit/qc/query/writeUtil'
}

export default defineApi
