import https from "https";
https.get("https://vietnam.un.org/vi/sdgs", {headers:{"User-Agent":"Mozilla/5.0"}}, (res) => {
  let data = "";
  res.on("data", c => data += c);
  res.on("end", () => {
    const regex = /([^"'\s=]+\.(?:png|jpg|jpeg|svg))/ig;
    const matches = data.match(regex);
    console.log(matches ? [...new Set(matches)].filter(s=>s.toLowerCase().includes("sdg") || s.toLowerCase().includes("goal")) : "none");
  });
});
