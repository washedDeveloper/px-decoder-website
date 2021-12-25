// decoder

// function atob(str) {
//   return Buffer.from(str, "base64").toString();
// }

// function btoa(str) {
//   return Buffer.from(str).toString("base64");
// }

function reverseTi(encoded, array) {
  for (var a = 0; a < array.length; a++) {
    encoded =
      encoded.slice(0, array[a] - a - 1) + encoded.slice(array[a] - a - 1 + 1);
  }
  return encoded;
}

var op = function (e, t, n) {
  for (var r = it(Eh(n), 10), o = [], i = -1, a = 0; a < e.length; a++) {
    var c = Math.floor(a / r.length + 1),
      u = a >= r.length ? a % r.length : a,
      f = r.charCodeAt(u) * r.charCodeAt(c);
    f > i && (i = f);
  }
  for (var h = 0; e.length > h; h++) {
    var l = Math.floor(h / r.length) + 1,
      s = h % r.length,
      Z = r.charCodeAt(s) * r.charCodeAt(l);
    for (Z >= t && (Z = rp(Z, 0, i, 0, t - 1)); -1 !== o.indexOf(Z); ) Z += 1;
    o.push(Z);
  }
  return o.sort(function (e, t) {
    return e - t;
  });
};

var np = function () {
  var e = "1604064986000";
  return it(Eh(e), 10);
};

var rp = function (e, t, n, r, o) {
  return Math.floor(((e - t) / (n - t)) * (o - r) + r);
};

function Eh(e) {
  var encodedHexes = encodeURIComponent(e).replace(
    /%([0-9A-F]{2})/g,
    function (e, t) {
      return String.fromCharCode("0x" + t);
    }
  );
  return btoa(encodedHexes);
}

function it(e, t) {
  for (var n = "", r = 0; r < e.length; r++) {
    n += String.fromCharCode(t ^ e.charCodeAt(r));
  }
  return n;
}

function reverseIt(e, t) {
  for (var n = "", r = 0; r < e.length; r++)
    n += String.fromCharCode(e.charCodeAt(r) ^ t);
  return n;
}

function decoder({ payload, uuid }) {
  return JSON.stringify(
    JSON.parse(
      reverseIt(
        atob(reverseTi(payload, op(np(), payload.length - 20, uuid))),
        50
      )
    ),
    null,
    2
  );
}

const button = document.querySelector("#decode-button");
button.onclick = function () {
  if (document.querySelector("#decoded-payload")) {
    document.querySelector("#decoded-payload").remove();
  }
  const encodedPayload = document.querySelector("#payload").value;
  const uuid = document.querySelector("#uuid").value;
  const decodedPayload = decoder({ payload: encodedPayload, uuid });
  const textArea = document.createElement("textarea");
  textArea.setAttribute("readonly", "");
  textArea.setAttribute("cols", "100");
  textArea.setAttribute("rows", "20");
  textArea.id = "decoded-payload";
  textArea.value = decodedPayload;
  document.querySelector("#container").appendChild(textArea);
};
