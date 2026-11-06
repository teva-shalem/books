<template>
  <div>
    <div 
      v-for="page in orderedPages" 
      :key="page.path" 
      :class="getPageClasses(page)">
      <PageContainer :page="page">
        <Content :page-key="page.key" />
      </PageContainer>
    </div>
  </div>
</template>

<script>
const PageContainer = {
  name: 'PageContainer',
  props: ['page'],
  provide() {
    return {
      pageContext: this.page,
    }
  },
  render(h) {
    return h('div', this.$slots.default)
  }
}

export default {
  name: 'PrintBook',
  components: {
    PageContainer,
  },
  computed: {
    orderedPages() {
      const customOrder = [
        '/',
        // '/intro/',
        '/derech-hapeima/',
        '/sipur-hayahhid/',
        '/sod-haiibur/',
        '/sefer-yetzira/',
        '/composition-book/',
        '/mishvaot-hapeima/',
        '/rosetta-stone/',
        '/slideshow/',
      ];

      return customOrder
        .map(path => this.$site.pages.find(p => p.path === path))
        .filter(Boolean);
    }
  },
  methods: {
    getPageClasses(page) {
      const classes = ['print-book'];
      if (!page.frontmatter) return classes;

      // pageClass can be string or space-separated classes
      if (page.frontmatter.pageClass) {
        classes.push(page.frontmatter.pageClass
          .toLowerCase()
          .replace(/\s+/g, '-'));
      }

      // layout lowercased and hyphenated (e.g. "reading-layout")
      if (page.frontmatter.layout) {
        classes.push(page.frontmatter.layout
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase()
          .replace(/\s+/g, '-'));
      }

      return classes;
    },
    waitForContentLoaded() {
      return new Promise((resolve) => {
        const container = this.$refs.bookContainer;
        if (!container) return resolve();

        const expectedCount = this.orderedPages.length;

        // Check if all chapters are present AND contain text/content
        const isFullyLoaded = () => {
          if (container.children.length < expectedCount) return false;
          
          // Ensure each chapter wrapper has actual text content or paragraphs loaded
          const chapters = Array.from(container.children);
          return chapters.every(chapter => chapter.innerText && chapter.innerText.trim().length > 0);
        };

        if (isFullyLoaded()) {
          return resolve();
        }

        const observer = new MutationObserver(() => {
          if (isFullyLoaded()) {
            observer.disconnect();
            resolve();
          }
        });

        // Watch for subtree changes (text injections, inner elements mounting)
        observer.observe(container, { childList: true, subtree: true, characterData: true });

        // Safety fallback timer (3 seconds max)
        setTimeout(() => {
          observer.disconnect();
          resolve();
        }, 3000);
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      const triggerPrintWhenReady = async () => {
        await this.waitForContentLoaded();
        
        setTimeout(() => {
          const handleAfterPrint = () => {
            window.removeEventListener('afterprint', handleAfterPrint);

            if (window.history.length > 1) {
              this.$router.back();
            } else {
              this.$router.push('/');
            }
          };

          window.addEventListener('afterprint', handleAfterPrint);
          window.print();
        }, 1000); // 300ms buffer guarantees complete DOM insertion and reflow
      };

      triggerPrintWhenReady();
    });
  }
}
</script>

<style lang="scss" scoped>
.print-book {
  break-after: page;

  &:last-child {
    break-after: avoid;
  }
}
</style>