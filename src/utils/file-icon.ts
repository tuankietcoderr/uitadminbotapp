export const fileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return require('@/assets/images/pdf.png');
    case 'xls':
    case 'xlsx':
      return require('@/assets/images/xlsx.png');
    default:
      null;
  }
};
