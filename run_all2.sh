#!/bin/bash
cat << 'JSEOF' > replace2.cjs
const fs = require('fs');
let meta = fs.readFileSync('src/metadata.json', 'utf8');
meta = meta.replace(/"name": "LotteryMgr"/, '"name": "အပျိုကြီးများ 2D"');
fs.writeFileSync('src/metadata.json', meta);

let layout = fs.readFileSync('components/Layout.tsx', 'utf8');
layout = layout.replace(/const navItems = \[[\s\S]*?\];/, `const navItems = [
    { name: "ပရိုဖိုင်များ", path: "/", icon: Users },
    { name: "ထီထိုးရန်", path: "/bets", icon: CircleDollarSign },
    { name: "ရလဒ်များ", path: "/results", icon: Trophy },
    { name: "မှတ်တမ်းများ", path: "/logs", icon: FileText },
    { name: "အက်ဒမင်များ", path: "/admins", icon: UserPlus },
  ];`);
layout = layout.replace(/LotteryMgr/g, 'အပျိုကြီးများ 2D');
layout = layout.replace(/>Menu</, '>မီနူး<');
layout = layout.replace(/>\s*Sign Out/, '>\n            ထွက်မည်');
fs.writeFileSync('components/Layout.tsx', layout);

let auth = fs.readFileSync('src/pages/Auth.tsx', 'utf8');
auth = auth.replace(/LotteryMgr/, 'အပျိုကြီးများ 2D');
auth = auth.replace(/Sign in to your admin account/, 'သင်၏ အက်ဒမင်အကောင့်သို့ ဝင်ရောက်ရန်');
auth = auth.replace(/>Email</, '>အီးမေးလ်<');
auth = auth.replace(/>Password</, '>စကားဝှက်<');
auth = auth.replace(/\{loading \? "Signing in\.\.\." : "Sign In"\}/, '{loading ? "ဝင်နေသည်..." : "ဝင်မည်"}');
fs.writeFileSync('src/pages/Auth.tsx', auth);

let profiles = fs.readFileSync('src/pages/Profiles.tsx', 'utf8');
profiles = profiles.replace(/Customer Profiles/, 'ဖောက်သည် ပရိုဖိုင်များ');
profiles = profiles.replace(/Add New Profile/g, 'ပရိုဖိုင်အသစ်ထည့်ရန်');
profiles = profiles.replace(/placeholder="Full Name"/, 'placeholder="အမည်အပြည့်အစုံ"');
profiles = profiles.replace(/placeholder="Phone Number"/, 'placeholder="ဖုန်းနံပါတ်"');
profiles = profiles.replace(/\{isAdding \? "Adding\.\.\." : "Add Profile"\}/, '{isAdding ? "ထည့်နေသည်..." : "ပရိုဖိုင်ထည့်ရန်"}');
profiles = profiles.replace(/Search by name, ID, or phone\.\.\./, 'အမည်၊ ID (သို့) ဖုန်းဖြင့် ရှာဖွေရန်...');
profiles = profiles.replace(/Name <ArrowUpDown/, 'အမည် <ArrowUpDown');
profiles = profiles.replace(/Phone <ArrowUpDown/, 'ဖုန်း <ArrowUpDown');
profiles = profiles.replace(/Loading profiles\.\.\./, 'ပရိုဖိုင်များ ရယူနေသည်...');
profiles = profiles.replace(/No profiles found\./, 'ပရိုဖိုင်များ မတွေ့ပါ။');
fs.writeFileSync('src/pages/Profiles.tsx', profiles);

let admins = fs.readFileSync('src/pages/Admins.tsx', 'utf8');
admins = admins.replace(/Admin Management/, 'အက်ဒမင် စီမံခန့်ခွဲမှု');
admins = admins.replace(/Create Admin</, 'အက်ဒမင်အသစ် ဖန်တီးရန်<');
admins = admins.replace(/Add a new admin to manage profiles and bets\./, 'ပရိုဖိုင်များနှင့် ထီများကို စီမံရန် အက်ဒမင်အသစ် ထည့်ပါ။');
admins = admins.replace(/>Full Name</, '>အမည်အပြည့်အစုံ<');
admins = admins.replace(/placeholder="Admin Name"/, 'placeholder="အက်ဒမင် အမည်"');
admins = admins.replace(/>Email Address</, '>အီးမေးလ် လိပ်စာ<');
admins = admins.replace(/>Password</, '>စကားဝှက်<');
admins = admins.replace(/\{loading \? "Creating\.\.\." : "Create Admin Account"\}/, '{loading ? "ဖန်တီးနေသည်..." : "အက်ဒမင်အကောင့် ဖန်တီးရန်"}');
fs.writeFileSync('src/pages/Admins.tsx', admins);

let bets = fs.readFileSync('src/pages/Bets.tsx', 'utf8');
bets = bets.replace(/Log Bet</, 'ထီထိုးရန်<');
bets = bets.replace(/>Customer Profile</, '>ဖောက်သည် ပရိုဖိုင်<');
bets = bets.replace(/Select a profile\.\.\.</, 'ပရိုဖိုင်ရွေးချယ်ပါ...<');
bets = bets.replace(/>2-Digit Number</, '>၂ လုံးဂဏန်း<');
bets = bets.replace(/>Amount \(MMK\)</, '>ပမာဏ (ကျပ်)<');
bets = bets.replace(/>"R" \(Reverse\)</, '>"R" (ပြောင်းပြန်)<');
bets = bets.replace(/Automatically generate the reverse number bet\. Disabled for double numbers\./, 'ပြောင်းပြန်ဂဏန်းကို အလိုအလျောက် ထိုးမည်။ အပူးဂဏန်းများအတွက် ပိတ်ထားသည်။');
bets = bets.replace(/Session automatically allocated based on Yangon Time/, 'ရန်ကုန်စံတော်ချိန်ကို အခြေခံ၍ အချိန်ကို အလိုအလျောက် သတ်မှတ်ထားသည်');
bets = bets.replace(/\{submitting \? "Logging Bet\.\.\." : "Log Bet"\}/, '{submitting ? "ထီထိုးနေသည်..." : "ထီထိုးရန်"}');
bets = bets.replace(/Recent Bets</, 'လတ်တလော ထီများ<');
bets = bets.replace(/>Time</, '>အချိန်<');
bets = bets.replace(/>Profile</, '>ပရိုဖိုင်<');
bets = bets.replace(/>Number</, '>ဂဏန်း<');
bets = bets.replace(/>Amount</, '>ပမာဏ<');
bets = bets.replace(/>Session</, '>အချိန်<');
bets = bets.replace(/No bets recently\./, 'လတ်တလော ထီမရှိပါ။');
fs.writeFileSync('src/pages/Bets.tsx', bets);

let results = fs.readFileSync('src/pages/Results.tsx', 'utf8');
results = results.replace(/Draw Results</, 'ထွက်မည့် ရလဒ်များ<');
results = results.replace(/>Draw Date</, '>ရက်စွဲ<');
results = results.replace(/>Session</, '>အချိန်<');
results = results.replace(/>Winning Number</, '>ပေါက်ဂဏန်း<');
results = results.replace(/Calculate/, 'တွက်ချက်မည်');
results = results.replace(/>Winning Number</, '>ပေါက်ဂဏန်း<');
results = results.replace(/>Total Winners</, '>စုစုပေါင်း ပေါက်သူများ<');
results = results.replace(/>Total Payout</, '>စုစုပေါင်း ပေးချေငွေ<');
results = results.replace(/Winning Bets List</, 'ပေါက်သော ထီစာရင်း<');
results = results.replace(/Multiplier:/, 'အဆ:');
results = results.replace(/Time Placed <ArrowUpDown/, 'ထိုးသော အချိန် <ArrowUpDown');
results = results.replace(/>Customer</, '>ဖောက်သည်<');
results = results.replace(/>Bet Amount</, '>ထိုးကြေး<');
results = results.replace(/>Payout</, '>ရငွေ<');
results = results.replace(/Calculating\.\.\./, 'တွက်ချက်နေသည်...');
results = results.replace(/No winners found for this draw\./, 'ဤပွဲစဉ်အတွက် ပေါက်သူ မရှိပါ။');
fs.writeFileSync('src/pages/Results.tsx', results);

JSEOF
node replace2.cjs
