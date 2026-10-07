const categories=[
 ["market","","Market Analysis","تحليل السوق",[
  ["closing","Closing Analysis","تحليل الإغلاق"],["dailyReturn","Daily Returns","العائد اليومي"],["percent","Percentage Change","نسبة التغير"],["movingAverage","Moving Average","المتوسط المتحرك"],["volatility","Volatility","التذبذب"]]],
 ["accounting","▣","Accounting Tools","أدوات المحاسبة",[
  ["vat","VAT Calculator","حاسبة ضريبة القيمة المضافة"],["depreciation","Depreciation","الإهلاك"],["workingCapital","Working Capital","رأس المال العامل"],["cogs","Cost of Goods Sold","تكلفة البضاعة المباعة"],["inventoryTurnover","Inventory Turnover","دوران المخزون"],["receivablesTurnover","Receivables Turnover","دوران الذمم المدينة"]]],
 ["ratios","%","Financial Ratios","النسب المالية",[
  ["currentRatio","Current Ratio","النسبة الجارية"],["quickRatio","Quick Ratio","النسبة السريعة"],["debtRatio","Debt Ratio","نسبة الدين"],["debtEquity","Debt-to-Equity","الدين إلى حقوق الملكية"],["roa","ROA","العائد على الأصول"],["roe","ROE","العائد على حقوق الملكية"],["margin","Net Profit Margin","هامش صافي الربح"]]],
 ["budget","▥","Budget & Planning","الميزانية والتخطيط",[
  ["breakEven","Break-Even Analysis","تحليل نقطة التعادل"],["budgetVariance","Budget Variance","انحراف الميزانية"],["forecast","Forecasting","التنبؤ المالي"],["contribution","Contribution Margin","هامش المساهمة"],["safety","Margin of Safety","هامش الأمان"]]],
 ["investment","◇","Investment Analysis","تحليل الاستثمار",[
  ["roi","ROI","العائد على الاستثمار"],["npv","NPV","صافي القيمة الحالية"],["irr","IRR","معدل العائد الداخلي"],["payback","Payback Period","فترة الاسترداد"],["pv","Present Value","القيمة الحالية"],["fv","Future Value","القيمة المستقبلية"]]],
 ["loans","$","Loans & Financing","القروض والتمويل",[
  ["loan","Loan Payment","دفعة القرض"],["simpleInterest","Simple Interest","الفائدة البسيطة"],["compoundInterest","Compound Interest","الفائدة المركبة"],["remaining","Remaining Balance","الرصيد المتبقي"]]],
 ["cash","≈","Cash Flow","التدفقات النقدية",[
  ["netCash","Net Cash Flow","صافي التدفق النقدي"],["operatingCash","Operating Cash Flow","التدفق النقدي التشغيلي"],["freeCash","Free Cash Flow","التدفق النقدي الحر"],["ccc","Cash Conversion Cycle","دورة التحويل النقدي"]]]
];

const defs={
 closing:{d:["Compare official closing values.","مقارنة قيم الإغلاق الرسمية."],f:[["Previous close","إغلاق اليوم السابق"],["Today's close","إغلاق اليوم"]],formula:"Change = Today − Previous | % Change = Change ÷ Previous × 100",calc:v=>[["Daily Change",v[1]-v[0]],["Percentage Change",((v[1]-v[0])/v[0])*100,"%"]]},
 dailyReturn:{d:["Calculate daily return.","حساب العائد اليومي."],f:[["Previous value","القيمة السابقة"],["Current value","القيمة الحالية"]],formula:"Return = (Current − Previous) ÷ Previous × 100",calc:v=>[["Daily Return",((v[1]-v[0])/v[0])*100,"%"]]},
 percent:{d:["Calculate percentage change.","حساب نسبة التغير."],f:[["Old value","القيمة القديمة"],["New value","القيمة الجديدة"]],formula:"% Change = (New − Old) ÷ Old × 100",calc:v=>[["Percentage Change",((v[1]-v[0])/v[0])*100,"%"]]},
 movingAverage:{d:["Calculate a simple average of entered values.","حساب المتوسط البسيط للقيم المدخلة."],f:[["Value 1","القيمة 1"],["Value 2","القيمة 2"],["Value 3","القيمة 3"]],formula:"Average = Sum of values ÷ Number of values",calc:v=>[["Moving Average",v.reduce((a,b)=>a+b,0)/v.length]]},
 volatility:{d:["Estimate volatility using standard deviation.","تقدير التذبذب باستخدام الانحراف المعياري."],f:[["Return 1 (%)","العائد 1 (%)"],["Return 2 (%)","العائد 2 (%)"],["Return 3 (%)","العائد 3 (%)"]],formula:"Volatility = Standard deviation of returns",calc:v=>{let m=v.reduce((a,b)=>a+b,0)/v.length;let sd=Math.sqrt(v.reduce((s,x)=>s+(x-m)**2,0)/v.length);return [["Volatility",sd,"%"]]}},
 vat:{d:["Calculate Saudi VAT at 15%.","حساب ضريبة القيمة المضافة 15٪."],f:[["Amount before VAT","المبلغ قبل الضريبة"]],formula:"VAT = Amount × 15% | Total = Amount + VAT",calc:v=>[["VAT",v[0]*.15],["Total incl. VAT",v[0]*1.15]]},
 depreciation:{d:["Straight-line depreciation.","الإهلاك بطريقة القسط الثابت."],f:[["Asset cost","تكلفة الأصل"],["Residual value","القيمة المتبقية"],["Useful life (years)","العمر الإنتاجي (سنوات)"]],formula:"Annual depreciation = (Cost − Residual) ÷ Useful life",calc:v=>[["Annual Depreciation",(v[0]-v[1])/v[2]]]},
 workingCapital:{d:["Calculate working capital.","حساب رأس المال العامل."],f:[["Current assets","الأصول المتداولة"],["Current liabilities","الخصوم المتداولة"]],formula:"Working Capital = Current Assets − Current Liabilities",calc:v=>[["Working Capital",v[0]-v[1]]]},
 cogs:{d:["Calculate cost of goods sold.","حساب تكلفة البضاعة المباعة."],f:[["Beginning inventory","مخزون أول المدة"],["Purchases","المشتريات"],["Ending inventory","مخزون آخر المدة"]],formula:"COGS = Beginning Inventory + Purchases − Ending Inventory",calc:v=>[["COGS",v[0]+v[1]-v[2]]]},
 inventoryTurnover:{d:["Measure inventory turnover.","قياس معدل دوران المخزون."],f:[["COGS","تكلفة البضاعة المباعة"],["Average inventory","متوسط المخزون"]],formula:"Inventory Turnover = COGS ÷ Average Inventory",calc:v=>[["Inventory Turnover",v[0]/v[1],"x"]]},
 receivablesTurnover:{d:["Measure receivables turnover.","قياس دوران الذمم المدينة."],f:[["Net credit sales","صافي المبيعات الآجلة"],["Average receivables","متوسط الذمم المدينة"]],formula:"Receivables Turnover = Net Credit Sales ÷ Average Receivables",calc:v=>[["Receivables Turnover",v[0]/v[1],"x"]]},
 currentRatio:{d:["Measure short-term liquidity.","قياس السيولة قصيرة الأجل."],f:[["Current assets","الأصول المتداولة"],["Current liabilities","الخصوم المتداولة"]],formula:"Current Ratio = Current Assets ÷ Current Liabilities",calc:v=>[["Current Ratio",v[0]/v[1],"x"]]},
 quickRatio:{d:["Measure quick liquidity.","قياس السيولة السريعة."],f:[["Current assets","الأصول المتداولة"],["Inventory","المخزون"],["Current liabilities","الخصوم المتداولة"]],formula:"Quick Ratio = (Current Assets − Inventory) ÷ Current Liabilities",calc:v=>[["Quick Ratio",(v[0]-v[1])/v[2],"x"]]},
 debtRatio:{d:["Measure debt as a share of assets.","قياس الدين كنسبة من الأصول."],f:[["Total debt","إجمالي الدين"],["Total assets","إجمالي الأصول"]],formula:"Debt Ratio = Total Debt ÷ Total Assets × 100",calc:v=>[["Debt Ratio",v[0]/v[1]*100,"%"]]},
 debtEquity:{d:["Compare debt with equity.","مقارنة الدين بحقوق الملكية."],f:[["Total debt","إجمالي الدين"],["Total equity","إجمالي حقوق الملكية"]],formula:"Debt-to-Equity = Total Debt ÷ Total Equity",calc:v=>[["Debt-to-Equity",v[0]/v[1],"x"]]},
 roa:{d:["Measure return on assets.","قياس العائد على الأصول."],f:[["Net income","صافي الدخل"],["Average total assets","متوسط إجمالي الأصول"]],formula:"ROA = Net Income ÷ Average Total Assets × 100",calc:v=>[["ROA",v[0]/v[1]*100,"%"]]},
 roe:{d:["Measure return on equity.","قياس العائد على حقوق الملكية."],f:[["Net income","صافي الدخل"],["Average equity","متوسط حقوق الملكية"]],formula:"ROE = Net Income ÷ Average Equity × 100",calc:v=>[["ROE",v[0]/v[1]*100,"%"]]},
 margin:{d:["Calculate net profit margin.","حساب هامش صافي الربح."],f:[["Net income","صافي الدخل"],["Revenue","الإيرادات"]],formula:"Net Profit Margin = Net Income ÷ Revenue × 100",calc:v=>[["Net Profit Margin",v[0]/v[1]*100,"%"]]},
 breakEven:{d:["Find break-even units.","حساب عدد وحدات نقطة التعادل."],f:[["Fixed costs","التكاليف الثابتة"],["Selling price/unit","سعر بيع الوحدة"],["Variable cost/unit","التكلفة المتغيرة للوحدة"]],formula:"Break-Even Units = Fixed Costs ÷ (Price − Variable Cost)",calc:v=>[["Break-Even Units",v[0]/(v[1]-v[2])]]},
 budgetVariance:{d:["Compare actual with budget.","مقارنة الفعلي بالميزانية."],f:[["Budgeted amount","المبلغ المخطط"],["Actual amount","المبلغ الفعلي"]],formula:"Variance = Actual − Budget",calc:v=>[["Budget Variance",v[1]-v[0]]]},
 forecast:{d:["Simple growth-based forecast.","تنبؤ بسيط باستخدام معدل النمو."],f:[["Current value","القيمة الحالية"],["Growth rate (%)","معدل النمو (%)"]],formula:"Forecast = Current × (1 + Growth Rate)",calc:v=>[["Forecast",v[0]*(1+v[1]/100)]]},
 contribution:{d:["Calculate contribution margin.","حساب هامش المساهمة."],f:[["Sales","المبيعات"],["Variable costs","التكاليف المتغيرة"]],formula:"Contribution Margin = Sales − Variable Costs",calc:v=>[["Contribution Margin",v[0]-v[1]],["Margin %",(v[0]-v[1])/v[0]*100,"%"]]},
 safety:{d:["Calculate margin of safety.","حساب هامش الأمان."],f:[["Actual sales","المبيعات الفعلية"],["Break-even sales","مبيعات التعادل"]],formula:"Margin of Safety = Actual Sales − Break-Even Sales",calc:v=>[["Margin of Safety",v[0]-v[1]],["Safety %",(v[0]-v[1])/v[0]*100,"%"]]},
 roi:{d:["Measure investment return.","قياس عائد الاستثمار."],f:[["Gain from investment","العائد من الاستثمار"],["Investment cost","تكلفة الاستثمار"]],formula:"ROI = (Gain − Cost) ÷ Cost × 100",calc:v=>[["ROI",(v[0]-v[1])/v[1]*100,"%"]]},
 npv:{d:["Calculate NPV for one future cash flow.","حساب صافي القيمة الحالية لتدفق مستقبلي واحد."],f:[["Initial investment","الاستثمار الأولي"],["Future cash flow","التدفق النقدي المستقبلي"],["Discount rate (%)","معدل الخصم (%)"],["Years","السنوات"]],formula:"NPV = Cash Flow ÷ (1+r)^n − Initial Investment",calc:v=>[["NPV",v[1]/Math.pow(1+v[2]/100,v[3])-v[0]]]},
 irr:{d:["Estimate IRR for one-period investment.","تقدير معدل العائد الداخلي لاستثمار لفترة واحدة."],f:[["Initial investment","الاستثمار الأولي"],["Cash received","النقد المستلم"]],formula:"IRR = (Cash Received ÷ Initial Investment − 1) × 100",calc:v=>[["IRR",(v[1]/v[0]-1)*100,"%"]]},
 payback:{d:["Estimate payback period.","تقدير فترة الاسترداد."],f:[["Initial investment","الاستثمار الأولي"],["Annual cash inflow","التدفق النقدي السنوي"]],formula:"Payback Period = Initial Investment ÷ Annual Cash Inflow",calc:v=>[["Payback Period",v[0]/v[1]," years"]]},
 pv:{d:["Calculate present value.","حساب القيمة الحالية."],f:[["Future value","القيمة المستقبلية"],["Rate (%)","المعدل (%)"],["Periods","عدد الفترات"]],formula:"PV = FV ÷ (1+r)^n",calc:v=>[["Present Value",v[0]/Math.pow(1+v[1]/100,v[2])]]},
 fv:{d:["Calculate future value.","حساب القيمة المستقبلية."],f:[["Present value","القيمة الحالية"],["Rate (%)","المعدل (%)"],["Periods","عدد الفترات"]],formula:"FV = PV × (1+r)^n",calc:v=>[["Future Value",v[0]*Math.pow(1+v[1]/100,v[2])]]},
 loan:{d:["Calculate equal monthly loan payment.","حساب دفعة القرض الشهرية."],f:[["Loan amount","مبلغ القرض"],["Annual rate (%)","المعدل السنوي (%)"],["Years","السنوات"]],formula:"Payment = P × r(1+r)^n ÷ ((1+r)^n − 1)",calc:v=>{let r=v[1]/1200,n=v[2]*12;let p=r===0?v[0]/n:v[0]*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);return [["Monthly Payment",p]]}},
 simpleInterest:{d:["Calculate simple interest.","حساب الفائدة البسيطة."],f:[["Principal","أصل المبلغ"],["Rate (%)","المعدل (%)"],["Years","السنوات"]],formula:"Interest = Principal × Rate × Time",calc:v=>[["Interest",v[0]*v[1]/100*v[2]],["Total",v[0]*(1+v[1]/100*v[2])]]},
 compoundInterest:{d:["Calculate compound growth.","حساب النمو بالفائدة المركبة."],f:[["Principal","أصل المبلغ"],["Annual rate (%)","المعدل السنوي (%)"],["Years","السنوات"]],formula:"Future Value = Principal × (1+r)^n",calc:v=>[["Future Value",v[0]*Math.pow(1+v[1]/100,v[2])]]},
 remaining:{d:["Estimate remaining loan balance.","تقدير الرصيد المتبقي للقرض."],f:[["Original loan","القرض الأصلي"],["Principal repaid","أصل المبلغ المسدد"]],formula:"Remaining Balance = Original Loan − Principal Repaid",calc:v=>[["Remaining Balance",v[0]-v[1]]]},
 netCash:{d:["Calculate net cash flow.","حساب صافي التدفق النقدي."],f:[["Cash inflows","التدفقات الداخلة"],["Cash outflows","التدفقات الخارجة"]],formula:"Net Cash Flow = Inflows − Outflows",calc:v=>[["Net Cash Flow",v[0]-v[1]]]},
 operatingCash:{d:["Simple operating cash flow estimate.","تقدير مبسط للتدفق النقدي التشغيلي."],f:[["Operating income","الدخل التشغيلي"],["Depreciation","الإهلاك"],["Taxes","الضرائب"]],formula:"OCF = Operating Income + Depreciation − Taxes",calc:v=>[["Operating Cash Flow",v[0]+v[1]-v[2]]]},
 freeCash:{d:["Calculate free cash flow.","حساب التدفق النقدي الحر."],f:[["Operating cash flow","التدفق النقدي التشغيلي"],["Capital expenditures","النفقات الرأسمالية"]],formula:"FCF = Operating Cash Flow − Capital Expenditures",calc:v=>[["Free Cash Flow",v[0]-v[1]]]},
 ccc:{d:["Calculate cash conversion cycle.","حساب دورة التحويل النقدي."],f:[["Days inventory outstanding","أيام بقاء المخزون"],["Days sales outstanding","أيام تحصيل المبيعات"],["Days payables outstanding","أيام سداد الموردين"]],formula:"CCC = DIO + DSO − DPO",calc:v=>[["Cash Conversion Cycle",v[0]+v[1]-v[2]," days"]]}
};

const UI={
 en:{
  home:"Home",about:"About",tools:"Tools",explore:"Explore",
  back:"Back",inputs:"Inputs",results:"Results",calculate:"Calculate",
  edit:"Edit inputs",noRecent:"No tools used yet.",
  popular:"Popular Tools",recent:"Recently Used",
  exploreTitle:"Explore Finora",exploreText:"Choose the financial area you want to explore.",
  categoryText:"Choose an available tool to continue.",
  calculator:"Calculator",invalid:"Enter valid numbers.",check:"Check the entered values."
 },
 ar:{
  home:"الرئيسية",about:"عن Finora",tools:"الأدوات",explore:"استكشف",
  back:"رجوع",inputs:"المدخلات",results:"النتائج",calculate:"احسب",
  edit:"تعديل المدخلات",noRecent:"لم تستخدم أي أداة بعد.",
  popular:"الأدوات الشائعة",recent:"المستخدمة مؤخرًا",
  exploreTitle:"استكشف Finora",exploreText:"اختر المجال المالي الذي تريد استكشافه.",
  categoryText:"اختر الأداة التي تحتاجها للمتابعة.",
  calculator:"الحاسبة",invalid:"أدخل أرقامًا صحيحة.",check:"تحقق من القيم المدخلة."
 }
};

const categoryDescriptions={
 en:{
  market:"Market movement, returns and volatility.",
  accounting:"Everyday accounting calculations.",
  ratios:"Liquidity, leverage and profitability ratios.",
  budget:"Planning, forecasting and break-even decisions.",
  investment:"Investment return and value analysis.",
  loans:"Loan payments, interest and balances.",
  cash:"Operating, free and net cash flow."
 },
 ar:{
  market:"حركة السوق والعوائد والتذبذب.",
  accounting:"الحسابات المحاسبية اليومية.",
  ratios:"نسب السيولة والديون والربحية.",
  budget:"التخطيط والتنبؤ وقرارات نقطة التعادل.",
  investment:"تحليل عوائد وقيمة الاستثمار.",
  loans:"دفعات القروض والفوائد والأرصدة.",
  cash:"التدفقات النقدية التشغيلية والحرة والصافية."
 }
};




function finoraLogoSVG(suffix="Main"){
  const a=`finoraA_${suffix}`;
  const b=`finoraB_${suffix}`;
  return `
  <svg class="finora-original-logo" viewBox="0 0 64 82" aria-hidden="true">
    <defs>
      <linearGradient id="${a}" x1="0" y1="1" x2="1" y2="0">
        <stop stop-color="#20a66a"/>
        <stop offset="1" stop-color="#d7f4b7"/>
      </linearGradient>
      <linearGradient id="${b}" x1="0" y1="1" x2="1" y2="0">
        <stop stop-color="#087447"/>
        <stop offset="1" stop-color="#9fe5a7"/>
      </linearGradient>
    </defs>
    <path fill="url(#${a})" d="M11 9C28 7 46 2 57 0c0 17-7 29-20 35-8 4-16 5-26 7V9Z"/>
    <path fill="url(#${b})" d="M11 35c14-2 28-7 41-13-1 17-9 28-22 34-6 3-12 5-19 7V35Z"/>
    <path fill="url(#${a})" d="M11 60c11-2 22-6 32-11-2 15-10 25-23 31l-9 2V60Z"/>
  </svg>`;
}

function ensureHeaderUI(){
  /* Restore the original green Finora logo in the sidebar */
  const brandMark=document.querySelector(".brand-mark");
  if(brandMark){
    brandMark.classList.add("original-logo");
    brandMark.innerHTML=finoraLogoSVG("Sidebar");
  }

  const topbar=document.querySelector(".topbar");
  if(!topbar)return;

  /* Remove the Finora/Calculator breadcrumb text from beside the language */
  topbar.querySelector(".breadcrumb")?.remove();

  /* The original header did not need a second logo beside the search */
  topbar.querySelector(".top-logo")?.remove();

  /* Restore the real search box even when the HTML file is an older version */
  let searchWrap=topbar.querySelector(".search-wrap");
  if(!searchWrap){
    searchWrap=document.createElement("div");
    searchWrap.className="search-wrap";
    searchWrap.innerHTML=`
      <input id="globalSearch" class="global-search"
        type="search"
        autocomplete="off"
        data-en-placeholder="Search for a tool..."
        data-ar-placeholder="ابحث عن أداة..."
        placeholder="Search for a tool...">
      <div id="searchResults" class="search-results"></div>`;

    const menuButton=topbar.querySelector(".menu-btn");
    if(menuButton) menuButton.insertAdjacentElement("afterend",searchWrap);
    else topbar.prepend(searchWrap);
  }

  /* Put one Light/Dark toggle directly beside the language control */
  const langBox=topbar.querySelector(".lang");
  if(langBox){
    let controls=topbar.querySelector(".top-controls");
    if(!controls){
      controls=document.createElement("div");
      controls.className="top-controls";
      langBox.insertAdjacentElement("beforebegin",controls);
      controls.appendChild(langBox);
    }

    controls.querySelector(".theme-toggle")?.remove();

    let themeButton=controls.querySelector(".theme-switch");
    if(!themeButton){
      themeButton=document.createElement("button");
      themeButton.type="button";
      themeButton.className="theme-switch";
      themeButton.onclick=toggleTheme;
      controls.insertBefore(themeButton,langBox);
    }
  }
}

function toggleTheme(){
  setTheme(getTheme()==="dark" ? "light" : "dark");
}

function getTheme(){
  return localStorage.getItem("finora_theme") || "light";
}

function applyTheme(){
  const theme=getTheme();
  document.documentElement.dataset.theme=theme;

  document.querySelectorAll("[data-theme-btn]").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.themeBtn===theme);
  });

  const button=document.querySelector(".theme-switch");
  if(button){
    const isDark=theme==="dark";
    button.innerHTML=isDark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
           <circle cx="12" cy="12" r="4"/>
           <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
         </svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
           <path d="M20.5 14.5A8 8 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/>
         </svg>`;
    button.setAttribute("aria-label",isDark ? "Switch to light mode" : "Switch to dark mode");
    button.title=isDark ? "Light mode" : "Dark mode";
  }
}

function setTheme(theme){
  localStorage.setItem("finora_theme",theme);
  applyTheme();
}

function lang(){return localStorage.getItem("finora_lang")||"en"}
function setLang(l){localStorage.setItem("finora_lang",l);location.reload()}
function t(k){return UI[lang()][k]||k}
function catName(c){return lang()==="en"?c[2]:c[3]}
function toolName(t){return lang()==="en"?t[1]:t[2]}
function categoryById(id){return categories.find(c=>c[0]===id)}
function findTool(id){
  for(const c of categories){
    const tool=c[4].find(x=>x[0]===id);
    if(tool)return {category:c,tool};
  }
  return null;
}

function categoryIcon(id){
 const a='fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
 const icons={
  market:`<svg viewBox="0 0 24 24" ${a}><path d="M4 18V6M4 18H20M7 15l4-4 3 3 5-6"/><path d="M15 8h4v4"/></svg>`,
  accounting:`<svg viewBox="0 0 24 24" ${a}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2"/></svg>`,
  ratios:`<svg viewBox="0 0 24 24" ${a}><path d="M7 17 17 7"/><circle cx="7.5" cy="7.5" r="2.2"/><circle cx="16.5" cy="16.5" r="2.2"/></svg>`,
  budget:`<svg viewBox="0 0 24 24" ${a}><path d="M4 19V5M4 19h16"/><path d="M8 16v-4M12 16V8M16 16v-7"/></svg>`,
  investment:`<svg viewBox="0 0 24 24" ${a}><path d="M4 17l5-5 4 3 7-8"/><path d="M15 7h5v5"/></svg>`,
  loans:`<svg viewBox="0 0 24 24" ${a}><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h3"/></svg>`,
  cash:`<svg viewBox="0 0 24 24" ${a}><path d="M4 8h16v10H4z"/><path d="M7 8V6h10v2"/><circle cx="12" cy="13" r="2.5"/></svg>`
 };
 return icons[id]||icons.accounting;
}

function renderChrome(){
 ensureHeaderUI();
 applyTheme();
 const l=lang();
 document.documentElement.lang=l;
 document.documentElement.dir=l==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-en]").forEach(el=>{
   el.textContent=l==="en"?el.dataset.en:el.dataset.ar;
 });
 document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===l));
 const search=document.getElementById("globalSearch");
 if(search){
   search.placeholder=l==="en"?search.dataset.enPlaceholder:search.dataset.arPlaceholder;
 }

 const currentTool=new URLSearchParams(location.search).get("tool");
 const currentCat=new URLSearchParams(location.search).get("cat");
 const menu=document.getElementById("sidebarMenus");
 if(menu){
  menu.innerHTML=categories.map(c=>`
   <details ${(currentCat===c[0] || c[4].some(x=>x[0]===currentTool))?"open":""}>
    <summary>
     <span class="side-icon">${categoryIcon(c[0])}</span>
     <span class="side-cat-name">${catName(c)}</span>
     <a class="side-cat-link" href="category.html?cat=${encodeURIComponent(c[0])}" onclick="event.stopPropagation()">›</a>
    </summary>
    <div class="side-tools">
     ${c[4].map(x=>`<a class="${currentTool===x[0]?"active":""}" href="tool.html?tool=${encodeURIComponent(x[0])}">${toolName(x)}</a>`).join("")}
    </div>
   </details>`).join("");
 }

 const page=document.body.dataset.page;
 document.querySelector(`[data-nav="${page}"]`)?.classList.add("active");
}

function toggleNav(){document.body.classList.toggle("nav-open")}
function closeNav(){document.body.classList.remove("nav-open")}

const RECENT_KEY="finora_recent_tools_v2";
function getRecent(){
 try{return JSON.parse(localStorage.getItem(RECENT_KEY)||"[]").filter(id=>findTool(id)).slice(0,5)}catch(e){return[]}
}
function addRecent(id){
 const r=getRecent().filter(x=>x!==id);r.unshift(id);
 localStorage.setItem(RECENT_KEY,JSON.stringify(r.slice(0,5)));
}

function renderHome(){
 const popular=["closing","vat","roi"];
 const p=document.getElementById("popularList");
 if(p) p.innerHTML=popular.map(id=>{
   const f=findTool(id);return `<a href="tool.html?tool=${id}"><span>${toolName(f.tool)}</span><span>›</span></a>`;
 }).join("");
 const r=document.getElementById("recentList");
 if(r){
  const ids=getRecent();
  r.innerHTML=ids.length?ids.map(id=>{
    const f=findTool(id);return `<a class="recent-link" href="tool.html?tool=${id}"><span>${toolName(f.tool)}</span><span>›</span></a>`;
  }).join(""):`<p class="empty">${t("noRecent")}</p>`;
 }
}

function renderExplore(){
 const grid=document.getElementById("categoryGrid");
 if(!grid)return;
 grid.innerHTML=categories.map(c=>`
  <a class="category-card" href="category.html?cat=${encodeURIComponent(c[0])}">
   <span class="cat-icon">${categoryIcon(c[0])}</span>
   <div><strong>${catName(c)}</strong><p>${categoryDescriptions[lang()][c[0]]}</p></div>
   <span class="go-arrow">›</span>
  </a>`).join("");
}

function renderCategory(){
 const id=new URLSearchParams(location.search).get("cat");
 const c=categoryById(id);
 if(!c){location.replace("explore.html");return}
 document.title=`${catName(c)} | Finora`;
 document.getElementById("categoryName").textContent=catName(c);
 document.getElementById("categoryDesc").textContent=categoryDescriptions[lang()][c[0]];
 document.getElementById("toolGrid").innerHTML=c[4].map(x=>{
   const d=defs[x[0]];
   return `<a class="tool-card" href="tool.html?tool=${encodeURIComponent(x[0])}">
    <div><strong>${toolName(x)}</strong><p>${d?.d?.[lang()==="en"?0:1]||""}</p></div>
    <span class="tool-arrow">›</span>
   </a>`;
 }).join("");
}

function parseFlexibleNumber(value){
  if(value===null || value===undefined) return NaN;
  let s=String(value).trim();
  const arabicDigits="٠١٢٣٤٥٦٧٨٩";
  const persianDigits="۰۱۲۳۴۵۶۷۸۹";
  s=s.replace(/[٠-٩]/g,d=>arabicDigits.indexOf(d))
     .replace(/[۰-۹]/g,d=>persianDigits.indexOf(d));
  s=s.replace(/[\u066C\u060C]/g,",")
     .replace(/\u066B/g,".")
     .replace(/[\s\u00A0\u202F]/g,"");
  s=s.replace(/[^\d.,+\-]/g,"");
  const commaCount=(s.match(/,/g)||[]).length;
  const dotCount=(s.match(/\./g)||[]).length;
  if(commaCount && dotCount){
    const lastComma=s.lastIndexOf(","), lastDot=s.lastIndexOf(".");
    const decimalSep=lastComma>lastDot ? "," : ".";
    const groupSep=decimalSep==="," ? "." : ",";
    s=s.split(groupSep).join("");
    if(decimalSep===","){
      const i=s.lastIndexOf(",");
      s=s.slice(0,i).replace(/,/g,"")+"."+s.slice(i+1).replace(/,/g,"");
    }else{
      const i=s.lastIndexOf(".");
      s=s.slice(0,i).replace(/\./g,"")+"."+s.slice(i+1).replace(/\./g,"");
    }
  }else if(commaCount){
    const parts=s.split(",");
    if(commaCount>1){
      const allGroups=parts.slice(1).every(p=>p.length===3);
      s=allGroups?parts.join(""):parts.slice(0,-1).join("")+"."+parts.at(-1);
    }else{
      const [a,b]=parts;
      s=(b.length===3 && a.replace(/[+\-]/g,"").length<=3)?a+b:a+"."+b;
    }
  }else if(dotCount>1){
    const parts=s.split(".");
    const allGroups=parts.slice(1).every(p=>p.length===3);
    s=allGroups?parts.join(""):parts.slice(0,-1).join("")+"."+parts.at(-1);
  }
  return Number(s);
}

let activeTool=null;
function showCalcTab(which){
 const input=document.getElementById("inputPanel"), result=document.getElementById("resultPanel");
 if(!input||!result)return;
 const showIn=which==="inputs";
 input.classList.toggle("mobile-active",showIn);
 result.classList.toggle("mobile-active",!showIn);
 document.getElementById("tabInputs")?.classList.toggle("active",showIn);
 document.getElementById("tabResults")?.classList.toggle("active",!showIn);
}

function renderTool(){
 const id=new URLSearchParams(location.search).get("tool");
 const f=findTool(id);
 if(!f || !defs[id]){location.replace("explore.html");return}
 activeTool=id;addRecent(id);
 const d=defs[id];
 document.title=`${toolName(f.tool)} | Finora`;
 document.getElementById("toolTitle").textContent=toolName(f.tool);
 document.getElementById("toolDesc").textContent=d.d[lang()==="en"?0:1];
 document.getElementById("fields").innerHTML=d.f.map((field,i)=>`
  <div class="field-wrap">
   <label for="v${i}">${field[lang()==="en"?0:1]}</label>
   <input id="v${i}" class="field calc-field" type="text" inputmode="decimal" autocomplete="off">
  </div>`).join("");
 document.getElementById("formula").textContent=d.formula;
 document.getElementById("results").innerHTML=`<p class="empty">${lang()==="en"?"Enter the values, then press Calculate.":"أدخل القيم ثم اضغط احسب."}</p>`;
 document.getElementById("backLink").href=`category.html?cat=${encodeURIComponent(f.category[0])}`;
 showCalcTab("inputs");
}

function calculateTool(){
 if(!activeTool)return;
 const vals=[...document.querySelectorAll(".calc-field")].map(x=>parseFlexibleNumber(x.value));
 if(vals.some(x=>!Number.isFinite(x))){alert(t("invalid"));return}
 try{
  const r=defs[activeTool].calc(vals);
  if(r.some(x=>!Number.isFinite(x[1])))throw 0;
  document.getElementById("results").innerHTML=r.map(x=>`
   <div class="result"><small>${x[0]}</small><strong>${x[1].toLocaleString(lang()==="ar"?"ar-SA":"en-US",{maximumFractionDigits:2})}${x[2]||""}</strong></div>`).join("");
  if(innerWidth<=620)showCalcTab("results");
 }catch(e){alert(t("check"))}
}

function renderAbout(){
 const list=document.getElementById("aboutList");
 if(!list)return;
 list.innerHTML=categories.map((c,i)=>`
  <div class="about-row">
   <span class="about-num">${String(i+1).padStart(2,"0")}</span>
   <strong>${catName(c)}</strong>
   <p>${categoryDescriptions[lang()][c[0]]}</p>
  </div>`).join("");
}


function getSearchMatches(query){
 const q=String(query||"").trim().toLowerCase();
 if(!q)return [];
 const matches=[];
 for(const c of categories){
   const categoryName=catName(c);
   for(const tool of c[4]){
     const name=toolName(tool);
     const english=tool[1].toLowerCase();
     const arabic=tool[2];
     const catEn=c[2].toLowerCase();
     const catAr=c[3];
     if(name.toLowerCase().includes(q) || english.includes(q) || arabic.includes(q) || catEn.includes(q) || catAr.includes(q)){
       matches.push({id:tool[0],name,category:categoryName});
     }
   }
 }
 return matches.slice(0,8);
}

function renderSearchResults(){
 const input=document.getElementById("globalSearch");
 const box=document.getElementById("searchResults");
 if(!input||!box)return;
 const matches=getSearchMatches(input.value);
 const hasQuery=input.value.trim().length>0;
 if(!hasQuery){
   box.classList.remove("open");
   box.innerHTML="";
   return;
 }
 box.innerHTML=matches.length?matches.map(item=>`
   <button class="search-result" type="button" onclick="location.href='tool.html?tool=${encodeURIComponent(item.id)}'">
     <span><strong>${item.name}</strong><small>${item.category}</small></span>
     <span class="search-arrow">›</span>
   </button>`).join(""):`<div class="search-empty">${lang()==="en"?"No matching tools.":"لا توجد أدوات مطابقة."}</div>`;
 box.classList.add("open");
}

function initGlobalSearch(){
 const input=document.getElementById("globalSearch");
 const box=document.getElementById("searchResults");
 if(!input||!box)return;
 input.addEventListener("input",renderSearchResults);
 input.addEventListener("focus",renderSearchResults);
 input.addEventListener("keydown",e=>{
   if(e.key==="Enter"){
     const first=getSearchMatches(input.value)[0];
     if(first)location.href=`tool.html?tool=${encodeURIComponent(first.id)}`;
   }
 });
 document.addEventListener("click",e=>{
   if(!e.target.closest(".search-wrap"))box.classList.remove("open");
 });
}

document.addEventListener("DOMContentLoaded",()=>{
 renderChrome();
 initGlobalSearch();
 const page=document.body.dataset.page;
 if(page==="home")renderHome();
 if(page==="explore")renderExplore();
 if(page==="category")renderCategory();
 if(page==="tool")renderTool();
 if(page==="about")renderAbout();
 document.getElementById("overlay")?.addEventListener("click",closeNav);
});
