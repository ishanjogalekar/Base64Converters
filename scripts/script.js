let lastBlobUrl = null;

function getPdfBlobFromBase64(base64) {
  const base64Clean = base64.includes(',') ? base64.split(',')[1] : base64;
  const byteCharacters = atob(base64Clean);
  const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: 'application/pdf' });
}

function previewPDF() {
  const base64 = document.getElementById('base64Input').value.trim();
  const message = document.getElementById('message');
  const preview = document.getElementById('pdfPreview');

  if (!base64) {
    message.textContent = "Please enter a Base64 string.";
    message.style.color = 'red';
    preview.src = '';
    return;
  }

  try {
    const blob = getPdfBlobFromBase64(base64);
    if (lastBlobUrl) {
      URL.revokeObjectURL(lastBlobUrl);
    }
    const url = URL.createObjectURL(blob);
    lastBlobUrl = url;
    preview.src = url;

    message.textContent = "PDF preview generated.";
    message.style.color = 'green';
  } catch (err) {
    message.textContent = "Invalid Base64 string.";
    message.style.color = 'red';
    preview.src = '';
  }
}

function downloadPDF() {
  const base64 = document.getElementById('base64Input').value.trim();
    const nameInput = document.getElementById('pdfName').value.trim();
    const message = document.getElementById('message');
  
    if (!base64) {
      message.textContent = "Please enter a Base64 string.";
      message.style.color = 'red';
      return;
    }
  
    try {
      const base64Clean = base64.includes(',') ? base64.split(',')[1] : base64;
      const byteCharacters = atob(base64Clean);
      const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
  
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      const fileName = nameInput ? `${nameInput}.pdf` : 'converted.pdf';
      link.download = fileName;
      link.click();
  
      message.textContent = `PDF "${fileName}" downloaded successfully.`;
      message.style.color = 'green';
    } catch (error) {
      message.textContent = "Invalid Base64 string.";
      message.style.color = 'red';
    }
}