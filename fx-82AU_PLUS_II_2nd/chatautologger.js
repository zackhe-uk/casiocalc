window.auth = prompt("Token?");
window.msgLog = [];
function recurseMsgs(chan, extra) {
setTimeout(() => {
    fetch(`https://discord.com/api/v9/channels/${chan}/messages?${extra}limit=100`, {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en-AU;q=0.9,en-AU;q=0.8,en;q=0.7,en;q=0.6",
        "authorization": "${auth}",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-debug-options": "bugReporterEnabled",
    },
    "referrer": window.location.href,
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
    }).then(req => req.json().then(jsonReq => {
        jsonReq.map(a => `${a.author.username}: ${a.content}`).forEach(b => { msgLog.push(b); });
        if(jsonReq.length >= 100) recurseMsgs(chan, `before=${jsonReq[jsonReq.length-1].id}&`);
        else {
            window.onclick = () => {
                navigator.clipboard.writeText(msgLog.join('\n'));
                window.onclick = null;
            };
            alert("Download complete! Click anywhere to copy to clipboard.");
        }
    }));
}, 1000);
}
recurseMsgs("1282292960448479284", "");
