const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 允許讀取 public 資料夾內的靜態檔案
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 更新後的 Boss 資料庫
const bossDatabase = [
    { 
        id: 1, 
        name: "【阿卡迪亞零式】輕量級一層 黑貓", 
        keywords: ["輕量級", "黑貓", "貓貓", "m1s", "boss1", "四連尖甲", "貓踏踏", "傾盆大貓"], 
        url: "blackcat.html" 
    },
    { 
        id: 2, 
        name: "至尊蜂王 蜂蜜姐姐", 
        keywords: ["蜂王", "蜜蜂", "蜂蜜", "m2s", "boss2"], 
        url: "boss2.html" 
    },
    { 
        id: 3, 
        name: "至尊重量級 炸彈摔摔", 
        keywords: ["重量級", "炸彈", "肌肉", "m3s", "boss3"], 
        url: "boss3.html" 
    },
    { 
        id: 4, 
        name: "至尊電子級 日衣", 
        keywords: ["電子級", "日衣", "科技", "m4s", "boss4"], 
        url: "boss4.html" 
    },
    { 
        id: 5, 
        name: "阿卡迪亞 最終威脅", 
        keywords: ["最終", "威脅", "本體", "m5s", "boss5"], 
        url: "boss5.html" 
    }
];

// 搜尋 API (支援模糊搜尋與關鍵字比對)
app.post('/api/search', (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.json({ success: false, message: "請輸入關鍵字" });
    }

    const lowerQuery = query.toLowerCase().trim();
    
    // 尋找名稱或關鍵字有符合的 Boss
    const result = bossDatabase.find(boss => 
        boss.name.toLowerCase().includes(lowerQuery) || 
        boss.keywords.some(k => k.includes(lowerQuery))
    );

    if (result) {
        res.json({ success: true, url: result.url });
    } else {
        res.json({ success: false, message: "找不到相關的 Boss 攻略，請換個詞試試！" });
    }
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` 🚀 阿卡迪亞攻略網後端已更新並成功啟動！`);
    console.log(` 🌐 網址請輸入：http://localhost:${PORT}`);
    console.log(`==================================================`);
});