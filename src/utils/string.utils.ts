export function generateRandomPhoneNumberForRick() {
  let phoneNumber = '+33 6 ';

  for (let i = 0; i < 4; i++) {
    const segment = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, '0');
    phoneNumber += segment + ' ';
  }

  return phoneNumber.trim() + ' 😉';
}
