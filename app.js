{\rtf1\ansi\ansicpg1251\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;\f1\fnil\fcharset0 .AppleSystemUIFontMonospaced-Medium;}
{\colortbl;\red255\green255\blue255;\red255\green255\blue255;\red82\green173\blue247;}
{\*\expandedcolortbl;;\cspthree\c100000\c100000\c100000;\cspthree\c47284\c72889\c95518;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\pardirnatural\partightenfactor0

\f0\fs26 \cf2 // app.js\
const tg = window.Telegram.WebApp;\
tg.expand();\
tg.ready();\
\
let selectedFile = null;\
\
// \uc0\u1048 \u1085 \u1080 \u1094 \u1080 \u1072 \u1083 \u1080 \u1079 \u1072 \u1094 \u1080 \u1103 \
document.addEventListener('DOMContentLoaded', () => \{\
    const uploadArea = document.getElementById('uploadArea');\
    const fileInput = document.getElementById('fileInput');\
    const preview = document.getElementById('preview');\
    const processBtn = document.getElementById('processBtn');\
    const resultDiv = document.getElementById('result');\
\
    // \uc0\u1047 \u1072 \u1075 \u1088 \u1091 \u1079 \u1082 \u1072  \u1092 \u1072 \u1081 \u1083 \u1072 \
    uploadArea.addEventListener('click', () => \cf3 fileInput.click\cf2 ());\
    \
    uploadArea.addEventListener('dragover', (e) => \{\
        e.preventDefault();\
        uploadArea.style.borderColor = '\cf3 #2481cc\cf2 ';\
    \});\
    \
    uploadArea.addEventListener('dragleave', () => \{\
        uploadArea.style.borderColor = '\cf3 #ccc\cf2 ';\
    \});\
    \
    uploadArea.addEventListener('drop', (e) => \{\
        e.preventDefault();\
        uploadArea.style.borderColor = '\cf3 #ccc\cf2 ';\
        if (e.dataTransfer.files.length) \{\
            handleFile(e.dataTransfer.files[0]);\
        \}\
    \});\
\
    fileInput.addEventListener('change', (e) => \{\
        if (e.target.files.length) \{\
            handleFile(e.target.files[0]);\
        \}\
    \});\
\
    function handleFile(file) \{\
        if (!file.type.match('image.*')) \{\
            alert('\uc0\u1055 \u1086 \u1078 \u1072 \u1083 \u1091 \u1081 \u1089 \u1090 \u1072 , \u1074 \u1099 \u1073 \u1077 \u1088 \u1080 \u1090 \u1077  \u1080 \u1079 \u1086 \u1073 \u1088 \u1072 \u1078 \u1077 \u1085 \u1080 \u1077 ');\
            return;\
        \}\
\
        selectedFile = file;\
        \
        // \uc0\u1055 \u1086 \u1082 \u1072 \u1079  \u1087 \u1088 \u1077 \u1074 \u1100 \u1102 \
        const reader = new FileReader();\
        reader.onload = (e) => \{\
            preview.src = e.target.result;\
            preview.style.display = 'block';\
            processBtn.disabled = false;\
        \};\
        reader.readAsDataURL(file);\
    \}\
\
    // \uc0\u1054 \u1073 \u1088 \u1072 \u1073 \u1086 \u1090 \u1082 \u1072  \u1092 \u1086 \u1090 \u1086 \
    processBtn.addEventListener('click', async () => \{\
        if (!selectedFile) return;\
\
        processBtn.disabled = true;\
        processBtn.textContent = '\uc0\u1054 \u1073 \u1088 \u1072 \u1073 \u1086 \u1090 \u1082 \u1072 ...';\
        resultDiv.style.display = 'none';\
\
        try \{\
            const formData = new FormData();\
            formData.append('image', selectedFile);\
            formData.append('userId', tg.initDataUnsafe.user?.id || 'anonymous');\
\
            // \uc0\u1054 \u1090 \u1087 \u1088 \u1072 \u1074 \u1082 \u1072  \u1085 \u1072  \u1074 \u1072 \u1096  API\
            const response = await fetch('\cf3 https://\uc0\u1074 \u1072 \u1096 -api-\u1089 \u1077 \u1088 \u1074 \u1077 \u1088 .com/process\cf2 ', \{\
                method: 'POST',\
                body: formData\
            \});\
\
            if (!response.ok) throw new Error('\uc0\u1054 \u1096 \u1080 \u1073 \u1082 \u1072  API');\
\
            const result = await response.json();\
            \
            // \uc0\u1054 \u1090 \u1086 \u1073 \u1088 \u1072 \u1078 \u1077 \u1085 \u1080 \u1077  \u1088 \u1077 \u1079 \u1091 \u1083 \u1100 \u1090 \u1072 \u1090 \u1072 \
            resultDiv.innerHTML = 
\f1 \
                <h3>\uc0\u1056 \u1077 \u1079 \u1091 \u1083 \u1100 \u1090 \u1072 \u1090  \u1086 \u1073 \u1088 \u1072 \u1073 \u1086 \u1090 \u1082 \u1080 :</h3>\
                $\{result.text ? 
\f0 <p>$\{result.text\}</p>
\f1  : ''\}\
                $\{result.imageUrl ? 
\f0 <img src="$\{result.imageUrl\}" style="max-width:100%;">
\f1  : ''\}\
                $\{result.tags ? 
\f0 <p>\uc0\u1058 \u1077 \u1075 \u1080 : $\{result.tags.join(', ')\}</p>
\f1  : ''\}\
            
\f0 ;\
            resultDiv.style.display = 'block';\
\
        \} catch (error) \{\
            alert('\uc0\u1054 \u1096 \u1080 \u1073 \u1082 \u1072 : ' + error.message);\
        \} finally \{\
            processBtn.disabled = false;\
            processBtn.textContent = '\uc0\u1054 \u1073 \u1088 \u1072 \u1073 \u1086 \u1090 \u1072 \u1090 \u1100 ';\
        \}\
    \});\
\
    // \uc0\u1054 \u1090 \u1087 \u1088 \u1072 \u1074 \u1082 \u1072  \u1076 \u1072 \u1085 \u1085 \u1099 \u1093  \u1074  Telegram\
    function sendToTelegram(data) \{\
        tg.sendData(JSON.stringify(data));\
    \}\
\});}