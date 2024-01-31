
interface IData {
  accessToken: string;
  refreshToken: string;
}

export function setCookie(cname: string, cvalue: IData, minutes: number) {
  const d = new Date();
  d.setTime(d.getTime() + 60000 * minutes);
  const expires = "expires=" + d.toUTCString();

  document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
  const name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return JSON.parse(c.substring(name.length, c.length))
    }
  }
  return "";
}
export function removeCookie(name:string) {
  document.cookie = name + '=; Max-Age=0'
}