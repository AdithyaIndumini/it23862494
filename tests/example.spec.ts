import { test, expect } from '@playwright/test';

/**
 * Data extracted from your "my one.xlsx" file.
 * Total scenarios: 35 (24 Positive, 10 Negative, 1 UI)
 */
const testData = [
  
  { "id": "Pos_Fun_0001", "name": "Convert simple present tense", "input": "mama gedhara yanavaa.", "expected": "මම ගෙදර යනවා." },
  { "id": "Pos_Fun_0002", "name": "Convert future plan with family", "input": "mama heta magee faemili  samaga gamanakata yanna hadhannee saha passe resturent ekata kaeema kanna yamu saha iita passe api cinema ekak balanna yamu.", "expected": "මම හෙට මගේ ෆැමිලි  සමග ගමනකට යන්න හදන්නේ සහ පස්සෙ රෙස්ටුරෙන්ට් එකට කෑම කන්න යමු සහ ඊට පස්සෙ අපි cinema එකක් බලන්න යමු." },
  { "id": "Pos_Fun_0003", "name": "Convert with social media term", "input": "mata Instagram post ekak dhaanna hadhannee.", "expected": "මට Instagram post එකක් දාන්න හදන්නේ." },
  { "id": "Pos_Fun_0004", "name": "Convert different question", "input": "meeka hariyata vaeda karanavaadha ?", "expected": "මේක හරියට වැඩ කරනවාද ?" },
  { "id": "Pos_Fun_0005", "name": "Convert imperative Command", "input": "issarahata yanna.", "expected": "ඉස්සරහට යන්න." },
  { "id": "Pos_Fun_0006", "name": "Convert negative form", "input": "api heta ennee naehae.", "expected": "අපි හෙට එන්නේ නැහැ." },
  { "id": "Pos_Fun_0007", "name": "Convert different greeting", "input": "suba udhaeesanak!", "expected": "සුබ උදෑසනක්!" },
  { "id": "Pos_Fun_0008", "name": "Convert birthday greeting with gift", "input": "magee yaLuvaata suba upandhinayak! mama oyaata labaa dhenna hadhannee gift ekak saha cake ekak kanna yamu.", "expected": "මගේ යාළුවාට සුබ උපන්දිනයක්! මම ඔයාට ලබා දෙන්න හදන්නේ gift එකක් සහ cake එකක් කන්න යමු." },
  { "id": "Pos_Fun_0009", "name": "Convert slang phrase", "input": "adoo vaedak baaragaththaanam eeka hariyata karapanko baQQ.", "expected": "අඩෝ වැඩක් බාරගත්තානම් ඒක හරියට කරපන්කො බං." },
  { "id": "Pos_Fun_0010", "name": "Convert past tense", "input": "api naetum panthi giyaa.", "expected": "අපි නැටුම් පන්ති ගියා." },
  { "id": "Pos_Fun_0011", "name": "Convert future tense", "input": "api iiLaGa sathiye gedhara yamu.", "expected": "අපි ඊළඟ සතියෙ ගෙදර යමු." },
  { "id": "Pos_Fun_0012", "name": "Convert plural pronoun", "input": "oyaalaa enavadha?", "expected": "ඔයාලා එනවද?" },
  { "id": "Pos_Fun_0013", "name": "Convert with brand name", "input": "WiFi connection hariyata naehae.", "expected": "WiFi connection හරියට නැහැ." },
  { "id": "Pos_Fun_0014", "name": "Convert with place name", "input": "api trip eka Kandy valata yamudha?", "expected": "අපි trip එක Kandy වලට යමුද?" },
  { "id": "Pos_Fun_0015", "name": "Convert with abbreviation", "input": "mata ATM ekak venna oonee.", "expected": "මට ATM එකක් වෙන්න ඕනේ." },
  { "id": "Pos_Fun_0016", "name": "Convert with date", "input": "dhesaembar 25", "expected": "දෙසැම්බර් 25" },
  { "id": "Pos_Fun_0017", "name": "Convert with measurement", "input": "milk litar 2k avashYAyi.", "expected": "milk ලිටර් 2ක් අවශ්‍යයි." },
  { "id": "Pos_Fun_0018", "name": "Convert multi-line input", "input": "mama gedhara yanavaa.  \n     oya enavadha?", "expected": "මම ගෙදර යනවා.  \n     ඔය එනවද?" },
  { "id": "Pos_Fun_0019", "name": "Convert repeated words", "input": "eka eka karanavaa.", "expected": "එක එක කරනවා." },
  { "id": "Pos_Fun_0020", "name": "Convert joined words", "input": "matapaankannaoonee", "expected": "මටපාන්කන්නඕනේ" },
  { "id": "Pos_Fun_0021", "name": "Convert polite request form", "input": "karuNaakarala eeka dhenavadha?", "expected": "කරුණාකරල ඒක දෙනවද?" },
  { "id": "Pos_Fun_0022", "name": "Convert with parentheses", "input": "(mama office yanavaa)", "expected": "(මම office යනවා)" },
  { "id": "Pos_Fun_0023", "name": "Convert with currency", "input": "USD 1500", "expected": "USD 1500" },
  { "id": "Pos_Fun_0024", "name": "Convert long paragraph", "input": "dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana, mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka saDHahan kaLeeya.", "expected": "දිට්වා සුළි කුණාටුව සමඟ ඇති වූ ගංවතුර සහ නායයෑම් හේතුවෙන් මාර්ග සංවර්ධන අධිකාරිය සතු මාර්ග කොටස් 430ක් විනාශයට පත්ව ඇති අතර, එහි සමස්ත දිග ප්‍රමාණය කිලෝමීටර් 300ක් පමණ වන බව ප්‍රවාහන, මහාමාර්ග සහ නාගරික සංවර්ධන අමාත්‍ය බිමල් රත්නායක සඳහන් කළේය." },
  { "id": "Neg_Fun_0001", "name": "Chat abbreviation in short sentence", "input": "thx machan!", "expected": "thx මචන්!" },
  { "id": "Neg_Fun_0002", "name": "Mixed case with texting shorthand", "input": "U enne? PLZ rply", "expected": "U එන්නේ? PLZ rply" },
  { "id": "Neg_Fun_0003", "name": "Medium length with SMS language", "input": "c u @ 6 pm @ my hm. btw, bring ur ID. ttyl!", "expected": "c u @ 6 pm @ my hm. btw, bring ur ID. ttyl!" },
  { "id": "Neg_Fun_0004", "name": "Incomplete/truncated Singlish words", "input": "ma ged yan", "expected": "ma ged yan" },
  { "id": "Neg_Fun_0005", "name": "Long text with mixed gibberish", "input": "mama gedhara yanavaa. xyz123!@# abc def ghi. api heta ennee naehae. random$$$ text here. oyaata kohomadha? more@#$ symbols.", "expected": "මම ගෙදර යනවා. xyz123!@# abc def ghi. අපි හෙට එන්නේ නැහැ. random$$$ text here. ඔයාට කොහොමද? more@#$ symbols." },
  { "id": "Neg_Fun_0006", "name": "Medium with number-text slang", "input": "gr8 job! c u 2moro. that's w8 4 me.", "expected": "gr8 job! c u 2moro. that's w8 4 me." },
  { "id": "Neg_Fun_0007", "name": "Short with special character abuse", "input": "m@m@ g3dh@r@ y@n@v@@", "expected": "m@m@ g3dh@r@ y@n@v@@" },
  { "id": "Neg_Fun_0008", "name": "Medium with inconsistent spacing", "input": "mamagedharayanavaa.oyaata kohomadha?apiheteenneenaehae.", "expected": "මමගෙදරයනවා.ඔයාටකොහොමද?අපිහෙටඑන්නේනැහැ." },
  { "id": "Neg_Fun_0009", "name": "Short English command with Singlish", "input": "STOP! ehema karanna epa!", "expected": "STOP! එහෙම කරන්න එපා!" },
  { "id": "Neg_Fun_0010", "name": "Long with chat language throughout", "input": "hey machan, sup? how r u? wanna meet up 2day? im @ hm now. txt me ur ETA. btw, thx 4 yesterday. c u soon! ttyl! g2g!", "expected": "hey machan, sup? how r u? wanna meet up 2day? im @ hm now. txt me ur ETA. btw, thx 4 yesterday. c u soon! ttyl! g2g!" },
  { "id": "Neg_UI_0001", "name": "Input field clear button does NOT clear Sinhala output", "input": "mama gedhara yanavaa", "expected": "When clear button (X) is clicked:<br>1. Input field should clear<br>2. Sinhala output should ALSO clear to empty" },

  ];

test.describe('IT3040 Assignment: Swift Translator Automation', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the translator and wait for it to load
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  });

  
  for (const scenario of testData) {
    if (scenario.id == 'Pos_UI_0001') {

      test(`${scenario.id}: ${scenario.name}`, async ({ page }) => {
        const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
        const outputArea = page.locator('div.bg-slate-50');

        // 1. Fill the input first to ensure there is something to clear
        await inputArea.fill('Ammee mama bath kaevaa');

        await page.waitForTimeout(5000); 
    
        // 2. Click the Clear button using the aria-label
        await page.getByText('🗑️ Clear').click();

        // 3. Verify Input field is empty
        // Textareas use .inputValue()
        await expect(inputArea).toHaveValue('');

        // 4. Verify Output field is empty
        // Divs use .toHaveText()
        await expect(outputArea).toHaveText('');
    
        console.log(`${scenario.id}: UI Clear Successful - Both fields are empty.`);
      });


    } else{
      test(`${scenario.id}: ${scenario.name}`, async ({ page }, testInfo) => {
        // 1. Identify Input and Output fields
        // Based on the site structure, we find the first and last textareas
        const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
        const outputArea = page.locator('div.bg-slate-50');

        // 2. Perform actions
        await inputArea.fill(scenario.input);
        
        // 3. Wait for real-time conversion (Brief delay for JS to run)
        await page.waitForTimeout(5000); 

        // 4. Capture Actual Output
        const actualOutput = await outputArea.innerHTML();

        // 5. Log for Excel Reporting
        console.log(`TC ID: ${scenario.id}`);
        console.log(`Actual Output: ${actualOutput}`);

        // 6. Attach to report for easy copying
        testInfo.annotations.push({
          type: 'Actual Output (Sinhala)',
          description: actualOutput
        });

        await expect(outputArea).toHaveText(scenario.expected);

        // // 7. Verify Result (Assertions)
        // // Note: Negative scenarios might fail this assertion, which validates the "Failure"
        // if (scenario.id.startsWith('Pos')) {
          
        // } else {
        //   // For Negative scenarios, we expect some inconsistency or capture the bug
        //   console.warn(`[NEG] ${scenario.id} captured result: ${actualOutput}`);
        // }
      });
    }
  }
  
});