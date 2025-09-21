// Direct local file saver - bypasses GitHub, saves immediately to hosting
export class DirectSaver {
  static async saveFile(filePath: string, content: any): Promise<{ success: boolean; message: string }> {
    try {
      const jsonString = JSON.stringify(content, null, 2);
      
      // Use Lovable's direct write capability
      const response = await fetch('/api/save-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: filePath,
          content: jsonString
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true, message: 'Archivo guardado exitosamente' };
    } catch (error) {
      console.error('Error saving file:', error);
      return { 
        success: false, 
        message: `Error al guardar: ${error instanceof Error ? error.message : 'Error desconocido'}` 
      };
    }
  }

  static async saveHomeContent(content: any) {
    return this.saveFile('public/content/home/hero.json', content);
  }

  static async saveAboutContent(content: any) {
    return this.saveFile('public/content/about/main.json', content);
  }

  static async saveContactContent(content: any) {
    return this.saveFile('public/content/contact/main.json', content);
  }

  static async saveSolutionsContent(content: any) {
    return this.saveFile('public/content/solutions/main.json', content);
  }

  static async saveCasesContent(content: any) {
    return this.saveFile('public/content/cases/main.json', content);
  }

  static async saveInsightsContent(content: any) {
    return this.saveFile('public/content/insights/main.json', content);
  }

  static async saveSettingsContent(content: any) {
    return this.saveFile('public/content/settings/global.json', content);
  }

  static async saveMediaContent(content: any) {
    return this.saveFile('public/content/media/library.json', content);
  }
}