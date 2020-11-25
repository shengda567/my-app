/*
 * action 类型
 */

export const type = {
  SWITCH_MENU: "SWITCH_MENU",
  ADD_SESSION: "ADD_SESSION",
};

// 菜单点击切换，修改面包屑名称
export function switchMenu(menuName) {
  return {
    type: type.SWITCH_MENU,
    menuName,
  };
}

export function add_session(userinfo) {
  return {
    type: type.ADD_SESSION,
    userinfo: userinfo,
  };
}
