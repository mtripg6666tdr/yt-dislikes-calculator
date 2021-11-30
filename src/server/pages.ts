type getPageResult = {page: string};
type getTopPageResult = getPageResult & {sid: string};
export function getTopPage(template:string, message:string = ""):getTopPageResult{
  const sid = "s" + Math.floor(new Date().getTime() * Math.random()).toString();
  return {
    page: template
      .replace(/\${MESSAGE}/g, message)
      .replace(/\${SID}/g, sid)
      .replace(/\${URL}/g, "")
      .replace(/\${RESULT}/g, "hidden")
      .replace(/\${TITLE}/g, "")
      .replace(/\${CHANNEL}/g, "")
      .replace(/\${LIKES_COUNT}/g, "")
      .replace(/\${DISLIKES_COUNT}/g, "")
      .replace(/\${EVAL_RATING}/g, "")
    , sid
  }
}
type getResultPageArgs = {
  title:string, channel:string, likes:string, dislikes:string, rating:string, url:string
};
export function getResultPage(template:string, sid:string, infos:getResultPageArgs, message:string = ""):getPageResult{
  return {
    page: template
      .replace(/\${MESSAGE}/g, message)
      .replace(/\${SID}/g, sid)
      .replace(/\${URL}/g, infos.url)
      .replace(/\${RESULT}/g, "")
      .replace(/\${TITLE}/g, infos.title)
      .replace(/\${CHANNEL}/g, infos.channel)
      .replace(/\${LIKES_COUNT}/g, infos.likes)
      .replace(/\${DISLIKES_COUNT}/g, infos.dislikes)
      .replace(/\${EVAL_RATING}/g, infos.rating)
  };
}