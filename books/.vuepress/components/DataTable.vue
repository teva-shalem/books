<template>

<section>
  <div style="text-align:center;">
  <h1>ספר האיכויות - Book of Qualities</h1>
  <h2>מפתח הקשר הסמנטי - Semantic Connection Index</h2>
  <h2>מקרא המרכבה - Legend of Composition</h2>
</div>
<p>
  שימוש בספר יצירה הוא יכולת לברוא. על הכוונה להיות טהורה. על האדם לנהוג כמלך. מקרא האיכויות מתנהג כמפתח להבנת החיים והטבע, להשתלבות במעשה המרכבה של ההיבנות מתיקון אישי לתיקון כללי.
</p>
<p style="direction:ltr;">
Using Sefer Yetzira is an ability to create. The intention must be pure. The person must act as a king. The legend of qualities acts as an index to the understanding of life and nature. It integrates the Art of Composition to the formation - from personal completion to collective completion.
</p>
<br />
<Img :path="'legend-composition.jpg'" style="max-height: 90vh;margin: 0 auto;display: block;"></Img>

<p>
יש עמודים שהם האנכיים והם מהווים ציר אופקי - או המציאות. יש שורות שהן האופקיות והן מהוות ציר אנכי - או האמת. מכפלה של אמת במציאות יוצרת שדה. המציאות היא הזמן, האמת היא הנפש, השדה הוא המרחב הוא העולם. ישנו סובייקט שהוא המרכבה וישנו אובייקט שהוא מערכת החיים. תנועת המרכבה במרכז המערכת יוצרת את דינמיקת ערכי השדות - או איכויות החיים.
</p>

<p style="direction:ltr;">
Columns are vertical and they form a horizontal axis - or reality. Rows are horizontal and they form a vertical axis - or truth. Multiplying truth with reality produces a field. Reality is time, truth is heart, field is a space is the world. A subject is the Composition and an object is the System of Life. Composition moving in the center of the System produces the dynamics between the values of the fields - or qualities of life.
</p>
<br />
        <b-field grouped group-multiline>
            <div v-for="(column, index) in columnsTemplate" 
                :key="index"
                class="control">
                <b-checkbox v-model="column.visible">
                    {{ column.title }}
                </b-checkbox>
            </div>
        </b-field>

        <b-table
            :data="data"
            :bordered="true"
            :striped="true"
            :narrowed="false"
            :hoverable="true"
            :focusable="true">

            <template slot-scope="props">
              <b-table-column v-for="(column, index) in columnsTemplate"
                  :key="index"
                  :label="column.title"
                  :visible="column.visible"
                  :numeric="column.numeric"
                  :centered="column.centered"
                  :cell-class="column['cell-class']">
                  {{ props.row[column.field] || '—' }}
              </b-table-column>
            </template>
        </b-table>
    </section>
</template>

<script lang="ts">
export default {
        data() {
            return {
                data: [
    {
      "quality": "פעימה",
      "sphere": 12,
      "hebrew-letter": "אות",
      "numerical-value": "-1",
      "mathematical-equation": "-1/1 = infinity",
      "geometrical-value": "עיגול",
      "quality-constructs": "חיים * שלום",
      "space": "עולם",
      "time": "שנה",
      "heart": "נפש",
      "description": "הכל זה הכל. הכלום מכסה אותו וכלול בתוכו.",
      "english-letter": "Sign",
      "roman-number": "="
    },
    {
      "quality": "",
      "sphere": "",
      "hebrew-letter": "",
      "numerical-value": "",
      "mathematical-equation": "",
      "geometrical-value": "",
      "quality-constructs": "",
      "space": "",
      "time": "",
      "heart": "",
      "description": "",
      "english-letter": "",
      "roman-number": ""
    },
    {
      "quality": "חיים",
      "sphere": 1,
      "hebrew-letter": "ב",
      "numerical-value": "3",
      "mathematical-equation": "3 = z1 + (x2 * y2)",
      "geometrical-value": "נקודה",
      "quality-constructs": "שורש אוויר * מים * אש",
      "space": "שבתאי",
      "time": "שבת",
      "heart": "פה",
      "description": "שורש מכפלת שלוש היסודות הוא הבינה. מרכז החיים.",
      "english-letter": "i",
      "roman-number": "1"
    },
    {
      "quality": "אוויר",
      "sphere": 2,
      "hebrew-letter": "א",
      "numerical-value": "2",
      "mathematical-equation": "2 = ",
      "geometrical-value": "",
      "quality-constructs": "רוח",
      "space": "אוויר",
      "time": "רוויה",
      "heart": "גוויה",
      "description": "אוויר הוא מקור ואחרית הדברים. הוא ההתפתחות.",
      "english-letter": "A",
      "roman-number": "2"
    },
    {
      "quality": "מים",
      "sphere": 3,
      "hebrew-letter": "מ",
      "numerical-value": "0",
      "mathematical-equation": "0 = ",
      "geometrical-value": "",
      "quality-constructs": "שקט",
      "space": "ארץ",
      "time": "קור",
      "heart": "בטן",
      "description": "מים הם יסוד הבריאה מתוך השקט.",
      "english-letter": "B",
      "roman-number": "3"
    },
    {
      "quality": "אש",
      "sphere": 4,
      "hebrew-letter": "ש",
      "numerical-value": "1",
      "mathematical-equation": "1 = mn",
      "geometrical-value": "",
      "quality-constructs": "מים",
      "space": "שמים",
      "time": "חום",
      "heart": "ראש",
      "description": "אש היא השראה מתרחבת לעד ולאחדות.",
      "english-letter": "C",
      "roman-number": "4"
    },
    {
      "quality": "כתר",
      "sphere": 5,
      "hebrew-letter": null,
      "numerical-value": "1",
      "mathematical-equation": null,
      "geometrical-value": null,
      "quality-constructs": "",
      "space": "רום",
      "time": "הווה",
      "heart": "קודקוד",
      "description": null,
      "english-letter": null,
      "roman-number": "5"
    },
    {
      "quality": "מלכות",
      "sphere": 6,
      "hebrew-letter": null,
      "numerical-value": "10 = 1",
      "mathematical-equation": null,
      "geometrical-value": null,
      "quality-constructs": "",
      "space": "תחת",
      "time": "הווה",
      "heart": "נקודת המפגש עם הקרקע",
      "description": null,
      "english-letter": null,
      "roman-number": "6"
    },
    {
      "quality": "חכמה",
      "sphere": 7,
      "hebrew-letter": null,
      "numerical-value": "2",
      "mathematical-equation": null,
      "geometrical-value": null,
      "quality-constructs": "",
      "space": "מזרח",
      "time": "הווה",
      "heart": "כתף ימין",
      "description": null,
      "english-letter": null,
      "roman-number": "7"
    },
    {
      "quality": "הוד",
      "sphere": 8,
      "hebrew-letter": null,
      "numerical-value": "8",
      "mathematical-equation": null,
      "geometrical-value": null,
      "quality-constructs": "",
      "space": "מערב",
      "time": "הווה",
      "heart": "כף יד שמאל",
      "description": null,
      "english-letter": null,
      "roman-number": "8"
    },
    {
      "quality": "נצח",
      "sphere": 9,
      "hebrew-letter": null,
      "numerical-value": "7",
      "mathematical-equation": null,
      "geometrical-value": null,
      "quality-constructs": "",
      "space": "דרום",
      "time": "הווה",
      "heart": "כף יד ימין",
      "description": null,
      "english-letter": null,
      "roman-number": "9"
    },
    {
      "quality": "בינה",
      "sphere": 10,
      "hebrew-letter": null,
      "numerical-value": "3",
      "mathematical-equation": null,
      "geometrical-value": null,
      "quality-constructs": "",
      "space": "צפון",
      "time": "הווה",
      "heart": "כתף שמאל",
      "description": null,
      "english-letter": null,
      "roman-number": "10"
    },
    {
      "quality": "אהבה",
      "sphere": 11,
      "hebrew-letter": null,
      "numerical-value": "13 = 4",
      "mathematical-equation": "φ = 12^n",
      "geometrical-value": "עיגול עם נקודה",
      "quality-constructs": "אוויר * מים * ממשלה = אמת",
      "space": "החוצה",
      "time": "מחר",
      "heart": "לב",
      "description": null,
      "english-letter": "O",
      "roman-number": "M"
    },
    {
      "quality": "דעת",
      "sphere": 0,
      "hebrew-letter": null,
      "numerical-value": "0",
      "mathematical-equation": "(6+1)^n",
      "geometrical-value": "שלדה",
      "quality-constructs": "הרהור * ריח * שיחה * חיים = נפש",
      "space": "פנימה",
      "time": "אתמול",
      "heart": "מוח הלב",
      "description": null,
      "english-letter": "U",
      "roman-number": "N"
    },
    {
      "quality": "שלום-מלחמה",
      "sphere": null,
      "hebrew-letter": "ג",
      "numerical-value": "1 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "z2",
      "quality-constructs": "אש * מים",
      "space": "צדק",
      "time": "ראשון",
      "heart": "עין ימין",
      "description": "סיכום הדברים הוא מים ואש כלומר אהבה. כלומר שלום בין השלום למלחמה.",
      "english-letter": "D",
      "roman-number": null
    },
    {
      "quality": "חוכמה-איוולת",
      "sphere": null,
      "hebrew-letter": "ד",
      "numerical-value": "4",
      "mathematical-equation": null,
      "geometrical-value": "z1",
      "quality-constructs": "אוויר * אוויר",
      "space": "מאדים",
      "time": "שני",
      "heart": "עין שמאל",
      "description": ".מקור הדברים הוא רוח מרוח, המבדיל בין חוכמה לאיוולת",
      "english-letter": "T",
      "roman-number": null
    },
    {
      "quality": "עושר-עוני",
      "sphere": null,
      "hebrew-letter": "כ",
      "numerical-value": "1 * 1 = 1",
      "mathematical-equation": null,
      "geometrical-value": "y2",
      "quality-constructs": "אש * אש",
      "space": "חמה",
      "time": "שלישי",
      "heart": "אף ימין",
      "description": "אש כפולה היא גחלת האמת הבוערת לעד. היא האושר.",
      "english-letter": "M",
      "roman-number": null
    },
    {
      "quality": "זרע-שממה",
      "sphere": null,
      "hebrew-letter": "פ",
      "numerical-value": "2 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "y1",
      "quality-constructs": "מים * אוויר",
      "space": "נגה",
      "time": "רביעי",
      "heart": "אף שמאל",
      "description": "רוח אלוהים על פני המים - מקור האמת עד להווה בו הוא זרע.",
      "english-letter": "P",
      "roman-number": null
    },
    {
      "quality": "חן-כיעור",
      "sphere": null,
      "hebrew-letter": "ר",
      "numerical-value": "0 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "x2",
      "quality-constructs": "מים * מים",
      "space": "כוכב",
      "time": "חמישי",
      "heart": "אוזן ימין",
      "description": "מים בתוך מים הם ״וחי לעולם״ וקיים. זה החן.",
      "english-letter": "F",
      "roman-number": null
    },
    {
      "quality": "ממשלה-עבדות",
      "sphere": null,
      "hebrew-letter": "ת",
      "numerical-value": "2 * 1 = 2",
      "mathematical-equation": null,
      "geometrical-value": "x1",
      "quality-constructs": "אוויר * אש",
      "space": "לבנה",
      "time": "שישי",
      "heart": "אוזן שמאל",
      "description": "אש עם חמצן - מציאות נדחסת ומתלהטת לעבדות או לחירות?",
      "english-letter": "S",
      "roman-number": null
    },
    {
      "quality": "מעשה",
      "sphere": null,
      "hebrew-letter": "י",
      "numerical-value": "4 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "z1 * x1",
      "quality-constructs": "חן * חוכמה",
      "space": "בתולה",
      "time": "אלול",
      "heart": "כליה שמאל",
      "description": "סוף מעשה במחשבה תחילה - יופייה של החוכמה.",
      "english-letter": "K",
      "roman-number": null
    },
    {
      "quality": "ראייה",
      "sphere": null,
      "hebrew-letter": "ה",
      "numerical-value": "1 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "x2 * y2",
      "quality-constructs": "עושר * חן",
      "space": "טלה",
      "time": "ניסן",
      "heart": "כבד",
      "description": "ראייה רחבה היא עושר היופי.",
      "english-letter": "R",
      "roman-number": null
    },
    {
      "quality": "שמיעה",
      "sphere": null,
      "hebrew-letter": "ו",
      "numerical-value": "0 * 1 = 0",
      "mathematical-equation": null,
      "geometrical-value": "y2 * z2",
      "quality-constructs": "שלום * עושר",
      "space": "שור",
      "time": "אייר",
      "heart": "מרה",
      "description": "באחרית הימים, הקשבה בשלווה היא שפע.",
      "english-letter": "V",
      "roman-number": null
    },
    {
      "quality": "רוגז",
      "sphere": null,
      "hebrew-letter": "ס",
      "numerical-value": "4 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "y1 * z1",
      "quality-constructs": "חכמה * זרע",
      "space": "קשת",
      "time": "כסלו",
      "heart": "יד ימין",
      "description": "זרע החוכמה הקדמון, נע אל ההווה בקושי רב, אך מגיע.",
      "english-letter": "X",
      "roman-number": null
    },
    {
      "quality": "שינה",
      "sphere": null,
      "hebrew-letter": "ק",
      "numerical-value": "2 * 4 = 8",
      "mathematical-equation": null,
      "geometrical-value": "z1 * x1",
      "quality-constructs": "ממשלה * חוכמה",
      "space": "דגים",
      "time": "אדר",
      "heart": "רגל שמאל",
      "description": "חכמת הממשלה היא ערות עד היום.",
      "english-letter": "L",
      "roman-number": null
    },
    {
      "quality": "תשמיש",
      "sphere": null,
      "hebrew-letter": "ל",
      "numerical-value": "2 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "y1 * x1",
      "quality-constructs": "ממשלה * זרע",
      "space": "מאזניים",
      "time": "תשרי",
      "heart": "קורקבן",
      "description": "זרע הממשלה הוא במיניות - להתאים בין האמת למציאות ברגע.",
      "english-letter": "W",
      "roman-number": null
    },
    {
      "quality": "הרהור",
      "sphere": null,
      "hebrew-letter": "צ",
      "numerical-value": "0 * 2 = 0",
      "mathematical-equation": null,
      "geometrical-value": "x1 * z2",
      "quality-constructs": "שלום * ממשלה",
      "space": "דלי",
      "time": "שבט",
      "heart": "רגל ימין",
      "description": "על ידי ממשלה בשלום - קיים הרהור לב ההופך מציאות לאהבה.",
      "english-letter": "Z",
      "roman-number": null
    },
    {
      "quality": "צחוק",
      "sphere": null,
      "hebrew-letter": "ע",
      "numerical-value": "1 * 2 = 2",
      "mathematical-equation": null,
      "geometrical-value": "x1 * y2",
      "quality-constructs": "עושר * ממשלה",
      "space": "גדי",
      "time": "טבת",
      "heart": "יד שמאל",
      "description": "בניית המציאות בעבודה וכלכלה, הופכת בקלות לאמת מצחיקה.",
      "english-letter": "Y",
      "roman-number": null
    },
    {
      "quality": "ריח",
      "sphere": null,
      "hebrew-letter": "ז",
      "numerical-value": "1 * 4 = 4",
      "mathematical-equation": null,
      "geometrical-value": "z1 * y2",
      "quality-constructs": "עושר * חוכמה",
      "space": "תאומים",
      "time": "סיוון",
      "heart": "טחול",
      "description": "באחרית הימים, החכם מתפרנס על פי התחושה.",
      "english-letter": "G",
      "roman-number": null
    },
    {
      "quality": "שיחה",
      "sphere": null,
      "hebrew-letter": "ח",
      "numerical-value": "0 * 1 = 0",
      "mathematical-equation": null,
      "geometrical-value": "y1 * x2",
      "quality-constructs": "חן * זרע",
      "space": "סרטן",
      "time": "תמוז",
      "heart": "לבלב",
      "description": "שיחה היא אמת נכנסת ומציאות יוצאת - זרע היופי.",
      "english-letter": "J",
      "roman-number": null
    },
    {
      "quality": "תנועה",
      "sphere": null,
      "hebrew-letter": "נ",
      "numerical-value": "0 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "y1 * z2",
      "quality-constructs": "שלום * זרע",
      "space": "עקרב",
      "time": "חשוון",
      "heart": "קיבה",
      "description": "התנועה היא אל האמת בהווה - שהיא זרע השלום.",
      "english-letter": "H",
      "roman-number": null
    },
    {
      "quality": "הזנה",
      "sphere": null,
      "hebrew-letter": "ט",
      "numerical-value": "0 * 0 = 0",
      "mathematical-equation": null,
      "geometrical-value": "z2 * x2",
      "quality-constructs": "חן * שלום",
      "space": "אריה",
      "time": "אב",
      "heart": "כליה ימין",
      "description": "אחרית הימים היא הזנה טבעית מחן ושלווה.",
      "english-letter": "E",
      "roman-number": null
    },
  ],
                columnsTemplate: [
                    { title: 'איכות', field: 'quality', visible: true },
                    { title: 'ספירה', field: 'sphere', visible: true },
                    { title: 'אות', field: 'hebrew-letter', visible: true },
                    { title: 'ערך מספרי', field: 'numerical-value', visible: true, numeric: true },
                    { title: 'משוואה מתמטית', field: 'mathematical-equation', visible: true },
                    { title: 'ערך גאומטרי', field: 'geometrical-value', visible: true },
                    { title: 'מרכיבי האיכות', field: 'quality-constructs', visible: true, centered: true },
                    { title: 'עולם', field: 'space', visible: true },
                    { title: 'שנה', field: 'time', visible: true },
                    { title: 'נפש', field: 'heart', visible: true },
                    { title: 'תיאור', field: 'description', visible: true, 'cell-class': 'right-aligned' },
                    { title: 'Letter', field: 'english-letter', visible: true },
                    { title: 'Roman', field: 'roman-number', visible: true },
                ]
            }
        }
}
</script>
<style lang="stylus">
.right-aligned {
  text-align: right;
}
</style>