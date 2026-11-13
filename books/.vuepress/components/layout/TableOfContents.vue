<script lang="ts">
import Vue, { ComponentOptions, VNode } from 'vue'
import { PageHeader } from 'vuepress-types'

const HEADING_LEVEL = {
  H2: 2,
  H3: 3,
} as const
const NOT_FOUND_INDEX = -1

interface TOFHeader extends PageHeader {
  children: TOFHeader[] | null
}

interface TableOfContentsComponent extends Vue {
  includeLevel: number[]
  headers: TOFHeader[] | null
  pageContext?: { headers?: PageHeader[] }
}

const TableOfContents: ComponentOptions<Vue> = {
  name: 'TableOfContents',

  props: {
    includeLevel: {
      type: Array,
      required: false,
      default: (): number[] => [HEADING_LEVEL.H2, HEADING_LEVEL.H3],
    },
  },

  inject: {
    pageContext: { default: null },
  },

  computed: {
    headers(this: TableOfContentsComponent): TOFHeader[] | null {
      const targetPage = this.pageContext ?? this.$page

      if (targetPage && targetPage.headers) {
        const [minLevel] = this.includeLevel
        const maxLevel = this.includeLevel[this.includeLevel.length - 1]

        const processHeaders = (
          headers: PageHeader[],
          rootLevel = minLevel,
        ): TOFHeader[] => {
          const result: TOFHeader[] = []
          for (let i = 0; i !== headers.length; ) {
            const nextRootOffset = headers
              .slice(i + 1)
              .findIndex(h => h.level === rootLevel)
            const nextRootIndex = nextRootOffset === NOT_FOUND_INDEX 
              ? headers.length
              : nextRootOffset + i + 1
            const thisHeader = headers[i]

            if (thisHeader.level >= rootLevel && thisHeader.level <= maxLevel) {
              const childHeaders = headers.slice(i + 1, nextRootIndex)
              const children =
                rootLevel < maxLevel && childHeaders.length > 0
                  ? processHeaders(childHeaders, rootLevel + 1)
                  : null
              result.push({
                ...thisHeader,
                children,
              })
            }
            i = nextRootIndex
          }
          return result
        }
        return processHeaders(targetPage.headers)
      }

      return null
    },
  },

  render(this: TableOfContentsComponent, h): VNode {
    if (!this.headers) {
      return h()
    }

    const renderHeaders = (items: TOFHeader[]): VNode => {
      return h(
        'ul',
        items.map(item =>
          h('li', { style: { listStyleType: item.title ? 'initial' : 'none' } }, [
            h(
              'RouterLink',
              {
                props: { to: `#${item.slug}` },
              },
              item.title,
            ),
            ...(item.children ? [renderHeaders(item.children)] : []),
          ]),
        ),
      )
    }

    return h('div', { class: 'table-of-contents' }, [renderHeaders(this.headers)])
  },
}

export default TableOfContents
</script>
