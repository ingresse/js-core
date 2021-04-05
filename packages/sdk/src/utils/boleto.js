import { Boleto } from 'broleto';
import { date } from './date';
import { patterns } from './patterns';

function decode(filteredValue = '') {
  const {
    expirationDate: srcExpiration,
    prettyAmount: amountPretty,
    ...boleto
  } = (new Boleto(filteredValue.trim().replace(/\D/gm, '')).toJSON() || {});

  if (!boleto.barcode) {
    return null;
  }

  const expiration = date.utc(srcExpiration || '').set('hour', 23).set('minute', 59).set('second', 59);
  const expirationDate = expiration.format('YYYY-MM-DD');
  const expired = expiration.isBefore(date());
  const expiredAt = expired ? (`Vencido ${expiration.fromNow()}`) : '';
  const expiredDays = (date().diff(expiration, 'days') || 0);

  return {
    ...boleto,
    amountPretty,
    expiration,
    expirationDate,
    expired,
    expiredAt,
    expiredDays,
    barcodeTyped: filteredValue,
  };
}

function pattern(inputValue = '') {
  return patterns.numeric(inputValue, [' ', '.']);
}

export const boleto = {
  decode,
  pattern,
};
