const express = require('express');
const path = require('path');
const app = express();

// 💡 核心修改：優先使用 Render 分配的 PORT，本地測試則預設 3000
const PORT = process.env.PORT || 3000;

// 允許讀取 public 資料夾內的靜態檔案
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 更新後的 Boss 資料庫
const bossDatabase = [
    { 
        id: 1, 
        name: "【阿卡迪亞零式】輕量級一層 黑貓", 
        keywords: ["輕量級", "黑貓", "靈魂之影", "m1s", "二連尖甲", "四連尖甲", "貓踏踏", "傾盆大貓","血腥抓撓","衝擊波","貓跳二連尖甲","迅貓急襲"], 
        url: "blackcat.html" 
    },
    { 
        id: 2, 
        name: "蜂蜂小甜心", 
        keywords: ["毒液滴落", "殺人斬", "殺人針", "m2s", "蜂蜂演唱會","環環心連心","圓圓心連心","溫柔地愛我 ","蜂蜂落幕曲","警告賀爾蒙","黑心"], 
        url: "honeyblovely.html"
    },
    { 
        id: 3, 
        name: "野蠻炸彈", 
        keywords: ["野蠻碎擊", "拳面猛擊", "雙重金臂鉤", "m3s", "強震衝","野蠻爆炸","組隊戰","零式引信炸彈","引信區域","超豪華野蠻大亂擊","超華麗野蠻旋火","究極超豪華野蠻大亂擊"], 
        url: "BruteBomber.html" 
    },
    { 
        id: 4, 
        name: "狡雷", 
        keywords: ["門神","驚電魔女狩獵", "圓環式魔女狩獵", "環圓式魔女狩獵", "m4s", "雷轉質展開","奔雷砲","雷轉質移植","靈魂震盪"], 
        url: "WickedThunder.html" 
    },
    { 
        id: 5, 
        name: "狡雷後半", 
        keywords: ["交叉尾亂擊", "狡詭雷焰", "本體", "狡詭特技", "芥末炸彈","尖尾刺","黑色安息日的日落","黑色安息日的午夜","火焰斬","劍雨","雷光鏈","黑色安息日的日出","劍舞"], 
        url: "WickedThunder2.html" 
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
    console.log(` 🌐 連接埠 Port: ${PORT}`);
    console.log(`==================================================`);
});
