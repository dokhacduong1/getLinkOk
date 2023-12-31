export async function  increaseReloadCount() {
  var _hash = await window.location.hash;
  if (_hash) {
    var x = await parseInt(decodeString(window.location.hash.replace("#", "")));

    x = x + 1;
    const encode = await encodeNumberToBase(x);
    window.location.hash = encode;
  } else {
     window.location.hash = await
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab";
  }
  return x || 1;
}

export function encodeNumberToBase(number) {
  var baseChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var encodedString = "";

  if (number === 0) {
    // Xử lý trường hợp đặc biệt khi số đầu vào là 0
    return "a".repeat(500);
  }

  while (number > 0 && encodedString.length < 50) {
    var remainder = number % baseChars.length;
    encodedString = baseChars.charAt(remainder) + encodedString;
    number = Math.floor(number / baseChars.length);
  }

  // Đảm bảo chuỗi có đủ 20 ký tự bằng cách thêm các ký tự "a" vào đầu chuỗi
  encodedString = "a".repeat(500 - encodedString.length) + encodedString;
  return encodedString;
}

export function decodeString(encodedString) {
  var baseChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var decodedNumber = 0;

  for (var i = 0; i < encodedString.length; i++) {
    var char = encodedString.charAt(i);
    var charIndex = baseChars.indexOf(char);

    if (charIndex === -1) {
      // Nếu ký tự không hợp lệ trong chuỗi mã hóa, dừng giải mã
      return null;
    }

    decodedNumber = decodedNumber * baseChars.length + charIndex;
  }

  // Trả về số đã giải mã thành công
  return decodedNumber;
}
