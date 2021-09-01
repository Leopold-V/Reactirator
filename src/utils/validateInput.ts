export const validateProjectName = (input: string): boolean => {
  const filenameReserved = /[<>:"/\\|?*\u0000-\u001F]/g;
  const filenameReservedWindowsNames = /^(con|prn|aux|nul|com\d|lpt\d)$/i;
  const rg1 = /^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
  const rg2 = /^\./; // cannot start with dot (.)
  const rg3 = /[A-Z]/; // cannot have uppercase letter
  if (!input || input.length > 255) {
    return false;
  }
  if (filenameReserved.test(input) || filenameReservedWindowsNames.test(input)) {
    return false;
  }
  if ((rg1.test(input) && rg2.test(input)) || rg3.test(input)) {
    return false;
  }
  return true;
}

export const validateFileName = (input: string): boolean => {
  const filenameReserved = /[<>:"/\\|?*\u0000-\u001F]/g;
  const filenameReservedWindowsNames = /^(con|prn|aux|nul|com\d|lpt\d)$/i;
  const rg1 = /^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
  const rg2 = /[.]/; // cannot have dot (.)
  if (!input || input.length > 255) {
    console.log('no input or >25');
    return false;
  }
  if (filenameReserved.test(input) || filenameReservedWindowsNames.test(input)) {
    console.log('filename reserved');
    return false;
  }
  if ((rg1.test(input) && rg2.test(input))) {
    console.log('rg1 rg2');
    return false;
  }
  return true;
}
