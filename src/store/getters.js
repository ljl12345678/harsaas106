const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    // 建立token的快件访问
    name: state => state.user.userinfo.username,
    userid: state => state.user.userinfo.userId,
    staffphoto: state => state.user.userinfo.staffPhoto,
    companyid: state => state.user.userinfo.companyId
}

export default getters
