import * as fs from "fs";
import express from "express";
import * as pages from "./pages";
import { SessionManager } from "./sessionManager";
import ytdl from "ytdl-core";
import { calcDislikes } from "./calc";

const app = express();
app.use(express.urlencoded({extended: true}));

const template = fs.readFileSync("./public/index.html", { encoding:"utf-8"});

app.get("/", (req, res) => {
  const { page, sid } = pages.getTopPage(template, "");
  SessionManager.addEntry(sid);
  res.writeHead(200, "OK", {
    "Content-Type": "text/html; charset=UTF-8"
  }).end(page);
});

app.post("/", async (req, res) => {
  const payload = req.body as {
    sid?:string, m_url:string
  };
  if(!payload.sid || !SessionManager.exists(payload.sid) || !payload.m_url || !ytdl.validateURL(payload.m_url)){
    const { page, sid } = pages.getTopPage(template, "正常な処理が行えませんでした。URLをご確認のうえ、もう一度お試しください。");
    SessionManager.addEntry(sid);
    res.writeHead(400, "Bad Request", {
      "Content-Type": "text/html; charset=UTF-8"
    }).end(page);
    return;
  }
  try {
    const basicInfo = await ytdl.getBasicInfo(payload.m_url);
    const rating = basicInfo.videoDetails.averageRating;
    const likes = basicInfo.videoDetails.likes;
    const { dislikes } = calcDislikes(likes, rating);
    res.writeHead(200, "OK", {
      "Content-Type": "text/html; charset=UTF-8"
    }).end(pages.getResultPage(template, payload.sid, {
      channel: basicInfo.videoDetails.author.name || "",
      title: basicInfo.videoDetails.title,
      likes: likes.toString(), 
      dislikes: dislikes.toString(), 
      rating: rating.toString(),
      url: payload.m_url,
    }, "").page);
  }
  catch(e){
    res.writeHead(200, "OK", {
      "Content-Type": "text/html; charset=UTF-8"
    }).end(pages.getResultPage(template, payload.sid, {
      channel: "-",
      title: "-",
      likes: "-", 
      dislikes: "-", 
      rating: "-",
      url: payload.m_url || ""
    }, "処理に失敗しました。もう一度お試しください。").page);
  }
})

const server = app.listen(8000, () => {
  console.log("Server started");
});