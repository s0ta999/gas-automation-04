/**************************************
 * Daily Task & Quote Reminder
 **************************************/

function sendDailyTaskReminder() {

  const SEND_TO = 'あなたのgmail@gmail.com'; // 自分のGmailに変更

  let mailBody = '';
  mailBody += 'Daily Reminder\n\n';
  mailBody += 'Quotes\n\n';

  // 名言を3つ取得
  const quotes = fetchThreeQuotes();

  quotes.forEach((q, index) => {
    mailBody += `${index + 1}. "${q.quote}"\n`;
    mailBody += `   - ${q.author}\n\n`;
  });

  mailBody += 'DID YOU FINISH TASK?\n';
  mailBody += '[ ] WALKING\n';
  mailBody += '[ ] PUSH-UP\n';
  mailBody += '[ ] ABS\n';
  mailBody += '[ ] CHECK NEWS\n';
  mailBody += '[ ] STUDY\n';
  mailBody += '[ ] CREATE VIDEO\n\n';

  mailBody += '--------------------------------\n';
  mailBody += 'Trusted News Sources\n';
  mailBody += 'BBC       : https://www.bbc.com/news\n';
  mailBody += 'CNN       : https://edition.cnn.com\n';
  mailBody += 'Economist : https://www.economist.com\n';
  mailBody += '--------------------------------\n';

  GmailApp.sendEmail(
    SEND_TO,
    'Daily Task Reminder',
    mailBody
  );
}


/**************************************
 * Quote API (ZenQuotes)
 **************************************/
function fetchThreeQuotes() {

  const url = 'https://zenquotes.io/api/random';
  const quotes = [];

  for (let i = 0; i < 3; i++) {
    const res = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true
    });

    const data = JSON.parse(res.getContentText());

    quotes.push({
      quote: data[0].q,
      author: data[0].a
    });
  }

  return quotes;
}
