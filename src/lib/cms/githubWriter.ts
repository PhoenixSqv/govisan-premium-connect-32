// GitHub writer using Lovable's native tools for direct file updates

declare global {
  interface Window {
    __lovable_write?: (filePath: string, content: string) => Promise<void>;
  }
}

export class GitHubWriter {
  static async writeFile(filePath: string, content: string): Promise<void> {
    try {
      // Use Lovable's native file writing capability
      if (window.__lovable_write) {
        await window.__lovable_write(filePath, content);
        console.log(`✅ File updated via Lovable: ${filePath}`);
        return;
      }

      // Fallback: Use fetch to simulate file writing (this won't actually work in production)
      // This is just for development/testing
      const response = await fetch('/api/write-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`✅ File updated: ${filePath}`);
    } catch (error) {
      console.error('Failed to write file:', error);
      throw new Error(`Failed to update ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async saveHomeContent(content: any): Promise<void> {
    const filePath = 'public/content/home/hero.json';
    const jsonContent = JSON.stringify(content, null, 2);
    await this.writeFile(filePath, jsonContent);
  }

  static async saveCasesContent(content: any): Promise<void> {
    const filePath = 'public/content/cases/main.json';
    const jsonContent = JSON.stringify(content, null, 2);
    await this.writeFile(filePath, jsonContent);
  }

  static async saveContactContent(content: any): Promise<void> {
    const filePath = 'public/content/contact/main.json';
    const jsonContent = JSON.stringify(content, null, 2);
    await this.writeFile(filePath, jsonContent);
  }

  static async saveAboutContent(content: any): Promise<void> {
    const filePath = 'public/content/about/main.json';
    const jsonContent = JSON.stringify(content, null, 2);
    await this.writeFile(filePath, jsonContent);
  }

  static async saveSolutionsContent(content: any): Promise<void> {
    const filePath = 'public/content/solutions/main.json';
    const jsonContent = JSON.stringify(content, null, 2);
    await this.writeFile(filePath, jsonContent);
  }
}