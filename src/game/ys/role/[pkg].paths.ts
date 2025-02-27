export default {
    async paths() {
  
      return new Array(10).fill(0).map((item, index) => {
        return {
          params: { id: index },
          content: `post.content_${index}` // 原始 Markdown 或 HTML
        }
      })
    }
  }