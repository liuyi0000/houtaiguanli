import $ajax from "../api";


// 登录页面逻辑
// login/signIn
export const signIn = function (params) {
  return $ajax.post('/intelligentAnalysis/login/signIn', params)
}

export const queryWork1 = function () {
  return $ajax.post('/intelligentAnalysis/PictureInfo/queryWork1')
}

export const queryProportion = function (params) {
  return $ajax.post('/intelligentAnalysis/seriedManageController/queryProportion', params)
}


export const getCaseAreaList = function(params) {
  return $ajax.post1("/intelligentAnalysis/Index/getCaseAreaList", params);
};

export const getCaseTypeList = function(params) {
  return $ajax.post("/intelligentAnalysis/Index/getCaseTypeList", params);
};

export const query110DZLXDic = function(params) {
  return $ajax.post(
    "/intelligentAnalysis/dicitemController/query110DZLXDic",
    params
  );
};
