# Setup

* npm i

# Deploy

* git remote add stage https://github.com/teva-shalem/books-staging.git
* git remote add world https://github.com/teva-shalem/books-world.git
* git remote add forever https://github.com/teva-shalem/books-forever.git

# Content
* <Blockquote><p>ציטוט כפסקה</p><template #quoter>מי אמר</template></Quote>
* <Quote quoter="מי אמר">ציטוט בשורה</Quote>
* # heading
* ## subheading
* <Img :path="'path_to_file_in_.vuepress_public_images.ext'"></Img>
* [link text](/path-to-md-filename-in-books/#hash)
* ***נטוי ומודגש***

## Caveats in md files
* When a line follows an empty line (a new paragprah), when that line begins with a Vue component, wrap that component with a <span> so that the lines following would belong to the same paragraph.
* Inside a block-level Vue component with a text slot, it must be wrapped with <p> and have <br/>s after every line before every line break.
