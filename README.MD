# Setup
* `npm i`
* `git remote add stage https://github.com/teva-shalem/books-staging.git`
* `git remote add world https://github.com/teva-shalem/books-world.git`
* `git remote add forever https://github.com/teva-shalem/books-forever.git`

# Deploy
* `npm run deploy:stage` to staging
* `npm run deploy:world` to production

# Content
```
* <Blockquote><p>ציטוט כפסקה</p><template #by>מי</template><template #from>מאיפה</template></Blockquote>
* <Quote from="מי אמר<"ציטוט בשורה</Quote>
* # heading
* ## subheading
* <Go to="/page">text</Go>
* <Pic path="path_to_file_in_.vuepress_public_images.ext" />
* [link text](/path-to-md-filename-in-books/#hash)
* ***נטוי ומודגש***
```

# Caveats in md files
* When a line follows an empty line (a new paragraph), when that line begins with a Vue component, begin that line with `&nbsp;` so that the lines following would belong to the same paragraph.
* Inside a block-level Vue component with a text slot, it must be wrapped with `<p>` and have `<br/>`s after every line before every line break.
