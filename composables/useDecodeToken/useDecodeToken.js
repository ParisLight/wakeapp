export const useDecodeToken = (token) => {
  const decodeToken = (token) => {
    // декодировка токена, чтобы вытянуть инфу из него
    const [headers, payload, signature] = token.split(".");
    let decodedPayload = null;
    if(process.server){
       decodedPayload = Buffer.from(payload, 'base64').toString();
    }
    if(process.client){
      decodedPayload = atob(payload);
    }
    const tokenData = JSON.parse(decodedPayload);
    return tokenData;
  };
  return { decodeToken }
};
