// チェックボックスの状態を切り替える関数
function toggleCheckbox(checkboxId) {
  var checkbox = document.getElementById(checkboxId);
  checkbox.textContent = (checkbox.textContent === '✅') ? '❌' : '✅';
  updateResult();
}

// 新しいタブで検索ページに飛ぶ関数
function openExplorePage() {
  var resultText = document.getElementById('resultText').textContent;
  var searchUrl = "https://x.com/search?q=" + encodeURIComponent(resultText) + "&src=typed_query";
  var newTab = window.open(searchUrl, "_blank");
  if (newTab) {
      newTab.focus();
  } else {
      window.location.href = searchUrl;
  }
}

// ユーザー名を入力する欄の値を取得して結果を更新する関数
function updateResult() {
  // ユーザー名を取得
  var username = document.getElementById('usernameInput').value;
  var tousername = document.getElementById('tousernameInput').value;
  // 各数値の入力値を取得
  var number1 = document.getElementById('numberInput1').value;
  var number2 = document.getElementById('numberInput2').value;
  // キーワード完全一致
  var exactMatch = document.getElementById('exactMatchInput').value;

  // 選択された言語を取得
  var selectedLanguage = document.getElementById('languageSelect').value;

  // チェックボックスの状態を取得
  var likeCheckboxState = document.getElementById('likeCheckbox').textContent === '✅';
  var rtCheckboxState = document.getElementById('rtCheckbox').textContent === '✅';
  var repliesCheckboxState = document.getElementById('repliesCheckbox').textContent === '✅';

  // 結果を表示する要素を取得
  var resultTextElement = document.getElementById('resultText');

  // 結果を表示
  var resultText = '';

  // ユーザー名が入力されていればfrom:(ユーザー名)を追加
  if (username.trim() !== '') {
      resultText += `from:${username} `;
  }

  if (tousername.trim() !== '') {
      resultText += `to:${tousername} `;
  }

  if (likeCheckboxState && number1.trim() !== '') {
      resultText += `min_faves:${number1} `;
  }

  if (rtCheckboxState && number2.trim() !== '') {
      resultText += `min_retweets:${number2} `;
  }

  if (selectedLanguage) {
      resultText += `lang:${selectedLanguage} `;
  }

  if (exactMatch.trim() !== '') {
      resultText += `"${exactMatch}" `;
  }

  if (repliesCheckboxState) {
      resultText += `filter:replies`;
  }

  resultTextElement.textContent = resultText.trim();

  // コピー可能なテキストとして設定
  resultTextElement.setAttribute('data-clipboard-text', resultText.trim());
}

// クリップボードにコピーするための関数
function copyToClipboard() {
  // 結果を表示する要素を取得
  var resultTextElement = document.getElementById('resultText');

  // コピー可能なテキストを取得
  var copyText = resultTextElement.getAttribute('data-clipboard-text');

  // テキストをクリップボードにコピー
  var textarea = document.createElement("textarea");
  textarea.value = copyText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// 結果をクリアする関数
function clearResult() {
  // 結果を表示する要素を取得
  var resultTextElement = document.getElementById('resultText');

  // 各入力欄の値をクリア
  document.getElementById('numberInput1').value = '';
  document.getElementById('numberInput2').value = '';
  document.getElementById('languageSelect').value = '';
  document.getElementById('usernameInput').value = '';
  document.getElementById('tousernameInput').value = '';
  document.getElementById('exactMatchInput').value = '';

  // 結果をクリア
  resultTextElement.textContent = '';

  // コピー可能なテキストもクリア
  resultTextElement.removeAttribute('data-clipboard-text');
}
