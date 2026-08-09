import type { QuizQuestion } from "./questions";

/**
 * Additional regex questions — top up the dataset past 200 total.
 * Level: pareto = everyday muscle memory, core = standard knowledge,
 * workflow = multi-step scenarios.
 */
export const regexExtraQuestions: QuizQuestion[] = [
  {
    id: "regex-word-boundary-1",
    category: "regex",
    level: "core",
    prompt: "Match the word 'cat' but not inside 'concatenate'.",
    answer: "\\bcat\\b",
    explanation:
      "`\\b` is a word boundary, so `\\bcat\\b` matches only standalone 'cat'.",
  },
  {
    id: "regex-word-char-1",
    category: "regex",
    level: "core",
    prompt: "Match a single letter, digit, or underscore.",
    answer: "\\w",
    explanation:
      "`\\w` is shorthand for `[A-Za-z0-9_]`. `\\d` is a digit, `\\s` whitespace.",
  },
  {
    id: "regex-digit-only",
    category: "regex",
    level: "core",
    prompt: "Match a string of exactly 5 digits.",
    answer: "^\\d{5}$",
    explanation:
      "Anchors `^`/`$` pin the whole string; `\\d{5}` demands exactly five digits.",
  },
  {
    id: "regex-optional",
    category: "regex",
    level: "core",
    prompt: "Match both 'color' and 'colour'.",
    answer: "colou?r",
    explanation:
      "`u?` makes the 'u' optional, so both spellings match.",
  },
  {
    id: "regex-phone",
    category: "regex",
    level: "core",
    prompt: "Match a US phone number like 555-123-4567.",
    answer: "\\d{3}-\\d{3}-\\d{4}",
    explanation:
      "Three dashes digit groups in the standard NNN-NNN-NNNN shape.",
  },
  {
    id: "regex-email-basic",
    category: "regex",
    level: "core",
    prompt: "Match a simple email like user@example.com.",
    answer: "^[\\w.+-]+@[\\w-]+\\.[\\w.]+$",
    explanation:
      "Local part, `@`, domain, then a dotted TLD — a pragmatic (not perfect) email pattern.",
  },
  {
    id: "regex-url",
    category: "regex",
    level: "core",
    prompt: "Match http or https URLs.",
    answer: "https?://[\\w.-]+",
    explanation:
      "`https?` allows both schemes; the domain is word chars, dots, and hyphens.",
  },
  {
    id: "regex-hex-color",
    category: "regex",
    level: "core",
    prompt: "Match a hex color like #1a2b3c.",
    answer: "#[0-9a-fA-F]{6}",
    explanation:
      "A `#` followed by exactly six hex digits, case-insensitive.",
  },
  {
    id: "regex-ipv4",
    category: "regex",
    level: "core",
    prompt: "Match an IPv4 address like 192.168.1.1.",
    answer: "(\\d{1,3}\\.){3}\\d{1,3}",
    explanation:
      "Three repeated `digit{dot}` groups then a final number — doesn't validate 0-255 ranges.",
  },
  {
    id: "regex-date-iso",
    category: "regex",
    level: "core",
    prompt: "Match a date in YYYY-MM-DD format.",
    answer: "\\d{4}-\\d{2}-\\d{2}",
    explanation:
      "The ISO date shape: four digits, dash, two, dash, two.",
  },
  {
    id: "regex-time-24h",
    category: "regex",
    level: "core",
    prompt: "Match a 24-hour time like 23:59.",
    answer: "^([01]\\d|2[0-3]):[0-5]\\d$",
    explanation:
      "Hours 00-23 via alternation, minutes 00-59 — a properly validated 24h clock.",
  },
  {
    id: "regex-whitespace-collapse",
    category: "regex",
    level: "workflow",
    prompt: "Replace runs of multiple spaces with a single space.",
    answer: "\\s+",
    explanation:
      "`\\s+` matches one or more whitespace chars; replacing with a space normalizes spacing.",
  },
  {
    id: "regex-trailing-space",
    category: "regex",
    level: "workflow",
    prompt: "Match trailing whitespace at the end of a line.",
    answer: "\\s+$",
    explanation:
      "`\\s+$` anchors whitespace to the end of the line — the classic cleanup regex.",
  },
  {
    id: "regex-leading-space",
    category: "regex",
    level: "workflow",
    prompt: "Match whitespace at the very start of a line.",
    answer: "^\\s+",
    explanation:
      "`^\\s+` catches indentation/noise at line start.",
  },
  {
    id: "regex-empty-lines",
    category: "regex",
    level: "workflow",
    prompt: "Match blank lines (containing only whitespace).",
    answer: "^\\s*$",
    explanation:
      "Start, zero-or-more whitespace, end — matches empty and whitespace-only lines.",
  },
  {
    id: "regex-non-greedy",
    category: "regex",
    level: "core",
    prompt: "Match from < to > stopping at the FIRST > (non-greedy).",
    answer: "<[^>]+>",
    explanation:
      "`[^>]+` matches anything except `>`, so it stops at the first closing bracket.",
  },
  {
    id: "regex-lazy-quantifier",
    category: "regex",
    level: "core",
    prompt: "Match 'a' followed by anything up to the first 'b' (lazy).",
    answer: "a.*?b",
    explanation:
      "`*?` is lazy — it consumes as little as possible while still reaching a `b`.",
  },
  {
    id: "regex-greedy-vs-lazy",
    category: "regex",
    level: "core",
    prompt: "Match everything between the first and LAST pair of parentheses.",
    answer: "\\(.*\\)",
    explanation:
      "Greedy `.*` stretches to the final `)` — contrast with lazy `.*?` which stops at the first.",
  },
  {
    id: "regex-capture-group",
    category: "regex",
    level: "core",
    prompt: "Capture the protocol from a URL like https://x.com.",
    answer: "^(https?)://",
    explanation:
      "The parenthesized `https?` becomes group 1 — retrievable as $1/\\1 in replacements.",
  },
  {
    id: "regex-named-group",
    category: "regex",
    level: "core",
    prompt: "Capture the username in 'alice@example.com' as a named group 'user'.",
    answer: "(?<user>[\\w.+-]+)@",
    explanation:
      "`(?<name>…)` names a group; refer to it as `\\k<user>` or `$<user>`.",
  },
  {
    id: "regex-backreference-1",
    category: "regex",
    level: "core",
    prompt: "Match a doubled word like 'the the'.",
    answer: "\\b(\\w+)\\s+\\1\\b",
    explanation:
      "Group 1 captures the word; `\\1` requires the exact same word again.",
  },
  {
    id: "regex-swap-words",
    category: "regex",
    level: "workflow",
    prompt: "Swap 'first last' to 'last first' in a replacement.",
    answer: "$2 $1",
    explanation:
      "After `^(\\w+) (\\w+)$` captures both words, the replacement `$2 $1` reorders them.",
  },
  {
    id: "regex-lookahead-1",
    category: "regex",
    level: "core",
    prompt: "Match 'foo' only when followed by 'bar' (without consuming it).",
    answer: "foo(?=bar)",
    explanation:
      "`(?=…)` is a positive lookahead — it asserts without including 'bar' in the match.",
  },
  {
    id: "regex-negative-lookahead",
    category: "regex",
    level: "core",
    prompt: "Match 'foo' only when NOT followed by 'bar'.",
    answer: "foo(?!bar)",
    explanation:
      "`(?!…)` is a negative lookahead, matching foo when the next chars aren't bar.",
  },
  {
    id: "regex-lookbehind-1",
    category: "regex",
    level: "core",
    prompt: "Match 'bar' only when preceded by 'foo'.",
    answer: "(?<=foo)bar",
    explanation:
      "`(?<=…)` is a positive lookbehind; supported in PCRE/JS (not all old engines).",
  },
  {
    id: "regex-negative-lookbehind",
    category: "regex",
    level: "core",
    prompt: "Match 'bar' only when NOT preceded by 'foo'.",
    answer: "(?<!foo)bar",
    explanation:
      "`(?<!…)` is negative lookbehind — asserts the absence of 'foo' before 'bar'.",
  },
  {
    id: "regex-password-rule",
    category: "regex",
    level: "workflow",
    prompt: "Require at least one uppercase letter anywhere in a string.",
    answer: "(?=.*[A-Z])",
    explanation:
      "The lookahead scans the whole string for an uppercase char without consuming.",
  },
  {
    id: "regex-password-full",
    category: "regex",
    level: "workflow",
    prompt: "Require 8+ chars with at least one digit and one letter.",
    answer: "^(?=.*\\d)(?=.*[A-Za-z]).{8,}$",
    explanation:
      "Two lookaheads enforce digit and letter; `.{8,}` enforces the minimum length.",
  },
  {
    id: "regex-alternation-1",
    category: "regex",
    level: "core",
    prompt: "Match 'apple', 'banana', or 'cherry'.",
    answer: "apple|banana|cherry",
    explanation:
      "`|` alternation matches any of the branches. Group them: `(apple|banana|cherry)`.",
  },
  {
    id: "regex-start-anchor",
    category: "regex",
    level: "core",
    prompt: "Match lines that START with 'TODO'.",
    answer: "^TODO",
    explanation:
      "`^` anchors to the start of the line (or string in single-line mode).",
  },
  {
    id: "regex-end-anchor",
    category: "regex",
    level: "core",
    prompt: "Match lines that END with 'done'.",
    answer: "done$",
    explanation:
      "`$` anchors to the end of the line.",
  },
  {
    id: "regex-word-start",
    category: "regex",
    level: "core",
    prompt: "Match words starting with 'un' like 'undo' or 'unhappy'.",
    answer: "\\bun\\w*",
    explanation:
      "Word boundary, literal 'un', then any word characters.",
  },
  {
    id: "regex-word-end",
    category: "regex",
    level: "core",
    prompt: "Match words ending in 'ing'.",
    answer: "\\b\\w+ing\\b",
    explanation:
      "Word characters then literal 'ing' inside word boundaries.",
  },
  {
    id: "regex-not-word",
    category: "regex",
    level: "core",
    prompt: "Match a single non-word character.",
    answer: "\\W",
    explanation:
      "`\\W` is the negation of `\\w` — punctuation, spaces, symbols.",
  },
  {
    id: "regex-not-digit",
    category: "regex",
    level: "core",
    prompt: "Match a single non-digit character.",
    answer: "\\D",
    explanation:
      "`\\D` matches anything that isn't `0-9`.",
  },
  {
    id: "regex-not-space",
    category: "regex",
    level: "core",
    prompt: "Match a single non-whitespace character.",
    answer: "\\S",
    explanation:
      "`\\S` is the negation of `\\s` — any non-whitespace character.",
  },
  {
    id: "regex-any-char-1",
    category: "regex",
    level: "core",
    prompt: "Match any single character except a newline.",
    answer: ".",
    explanation:
      "The dot matches one character. Add `s` flag to also match newlines.",
  },
  {
    id: "regex-one-or-more",
    category: "regex",
    level: "core",
    prompt: "Match one or more digits in a row.",
    answer: "\\d+",
    explanation:
      "`+` means one or more — at least one digit required.",
  },
  {
    id: "regex-zero-or-more",
    category: "regex",
    level: "core",
    prompt: "Match zero or more letter 'a's.",
    answer: "a*",
    explanation:
      "`*` matches zero or more — it can match an empty string.",
  },
  {
    id: "regex-exactly-n",
    category: "regex",
    level: "core",
    prompt: "Match exactly 3 letter 'a's.",
    answer: "a{3}",
    explanation:
      "`{3}` requires exactly three occurrences.",
  },
  {
    id: "regex-range-count",
    category: "regex",
    level: "core",
    prompt: "Match 2 to 4 digits in a row.",
    answer: "\\d{2,4}",
    explanation:
      "`{2,4}` means between two and four occurrences inclusive.",
  },
  {
    id: "regex-at-least-n",
    category: "regex",
    level: "core",
    prompt: "Match at least 3 vowels in a row.",
    answer: "[aeiou]{3,}",
    explanation:
      "`{3,}` requires three or more; the class restricts to vowels.",
  },
  {
    id: "regex-vowels",
    category: "regex",
    level: "core",
    prompt: "Match a single vowel (a, e, i, o, u).",
    answer: "[aeiou]",
    explanation:
      "Character classes list allowed characters; add `-i` for case-insensitivity.",
  },
  {
    id: "regex-consonants",
    category: "regex",
    level: "workflow",
    prompt: "Match a single consonant (a letter that isn't a vowel).",
    answer: "(?![aeiou])[a-z]",
    explanation:
      "A negative lookahead excludes vowels, then `[a-z]` requires a letter.",
  },
  {
    id: "regex-negated-class",
    category: "regex",
    level: "core",
    prompt: "Match any character that is NOT a digit.",
    answer: "[^0-9]",
    explanation:
      "`[^…]` negates a character class — anything except 0-9.",
  },
  {
    id: "regex-class-range-1",
    category: "regex",
    level: "core",
    prompt: "Match any lowercase letter.",
    answer: "[a-z]",
    explanation:
      "Ranges inside classes: `[a-z]` for lowercase, `[A-Z]` uppercase, `[a-zA-Z]` both.",
  },
  {
    id: "regex-alphanumeric",
    category: "regex",
    level: "core",
    prompt: "Match any letter or digit (no underscore).",
    answer: "[a-zA-Z0-9]",
    explanation:
      "Explicit class combining letters and digits (unlike `\\w`, it omits `_`).",
  },
  {
    id: "regex-slug",
    category: "regex",
    level: "workflow",
    prompt: "Match a URL slug like 'my-post-title'.",
    answer: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
    explanation:
      "Lowercase words separated by single hyphens, using a non-capturing group.",
  },
  {
    id: "regex-file-extension",
    category: "regex",
    level: "core",
    prompt: "Match the extension in 'report.pdf' (pdf).",
    answer: "\\.(\\w+)$",
    explanation:
      "Escaped dot then word chars at end-of-string; group 1 is the extension.",
  },
  {
    id: "regex-filename-no-ext",
    category: "regex",
    level: "workflow",
    prompt: "Extract 'report' from 'report.pdf' (without the extension).",
    answer: "^(.+)\\.[^.]+$",
    explanation:
      "Group 1 captures everything up to the last dot; the extension is excluded.",
  },
  {
    id: "regex-html-tag",
    category: "regex",
    level: "core",
    prompt: "Match an opening HTML tag like <div class=\"x\">.",
    answer: "<[a-z][a-z0-9-]*(\\s+[a-z-]+=\"[^\"]*\")*>",
    explanation:
      "Tag name plus optional attributes with quoted values — good enough for simple cases.",
  },
  {
    id: "regex-comment-strip",
    category: "regex",
    level: "workflow",
    prompt: "Match // line comments in code.",
    answer: "//.*$",
    explanation:
      "Two slashes then anything to end of line. Beware: also matches inside strings/URLs.",
  },
  {
    id: "regex-csv-field",
    category: "regex",
    level: "workflow",
    prompt: "Match a quoted CSV field like \"hello, world\".",
    answer: "\"[^\"]*\"",
    explanation:
      "Opening quote, non-quotes, closing quote — handles commas inside quotes.",
  },
  {
    id: "regex-currency",
    category: "regex",
    level: "core",
    prompt: "Match an amount like $1,234.56.",
    answer: "^\\$\\d{1,3}(,\\d{3})*(\\.\\d{2})?$",
    explanation:
      "Dollar, grouped thousands, optional cents — a classic formatted-money pattern.",
  },
  {
    id: "regex-credit-card",
    category: "regex",
    level: "core",
    prompt: "Match a 16-digit credit card number in 4-4-4-4 groups.",
    answer: "\\d{4}[ -]?\\d{4}[ -]?\\d{4}[ -]?\\d{4}",
    explanation:
      "Four groups of four digits with optional separators.",
  },
  {
    id: "regex-uuid",
    category: "regex",
    level: "core",
    prompt: "Match a UUID like 550e8400-e29b-41d4-a716-446655440000.",
    answer: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
    explanation:
      "The 8-4-4-4-12 hex shape (add `i` flag or expand to A-F for uppercase).",
  },
  {
    id: "regex-sha-hash",
    category: "regex",
    level: "core",
    prompt: "Match a 40-char git SHA-1.",
    answer: "\\b[0-9a-f]{40}\\b",
    explanation:
      "Forty hex digits between word boundaries — matches full git commit ids.",
  },
  {
    id: "regex-mac-address",
    category: "regex",
    level: "core",
    prompt: "Match a MAC address like aa:bb:cc:dd:ee:ff.",
    answer: "([0-9a-f]{2}:){5}[0-9a-f]{2}",
    explanation:
      "Five repeated two-hex-digit groups with colons, then a final group.",
  },
  {
    id: "regex-version-semver",
    category: "regex",
    level: "core",
    prompt: "Match a semantic version like 1.2.3 (major.minor.patch).",
    answer: "^\\d+\\.\\d+\\.\\d+$",
    explanation:
      "Three numeric components separated by dots — the basic semver skeleton.",
  },
  {
    id: "regex-quoted-string",
    category: "regex",
    level: "core",
    prompt: "Match a double-quoted string that may contain escaped quotes.",
    answer: "\"(\\\\.|[^\"\\\\])*\"",
    explanation:
      "Either an escaped char (`\\\\.`) or any non-quote non-backslash — the robust quoted-string pattern.",
  },
  {
    id: "regex-escaped-dot",
    category: "regex",
    level: "core",
    prompt: "Match a literal period character.",
    answer: "\\.",
    explanation:
      "`\\.` matches the dot literally; unescaped `.` would match any character.",
  },
  {
    id: "regex-escaped-backslash",
    category: "regex",
    level: "core",
    prompt: "Match a literal backslash character.",
    answer: "\\\\",
    explanation:
      "Two backslashes in the pattern represent one literal backslash.",
  },
  {
    id: "regex-escaped-plus",
    category: "regex",
    level: "core",
    prompt: "Match the literal '+' character.",
    answer: "\\+",
    explanation:
      "Unescaped `+` is a quantifier; `\\+` matches the plus sign itself.",
  },
  {
    id: "regex-escaped-question",
    category: "regex",
    level: "core",
    prompt: "Match the literal '?' character.",
    answer: "\\?",
    explanation:
      "Escape `?` to match the literal question mark rather than a quantifier.",
  },
  {
    id: "regex-escaped-brackets",
    category: "regex",
    level: "core",
    prompt: "Match literal square brackets like [note].",
    answer: "\\[note\\]",
    explanation:
      "Square brackets must be escaped outside a class to match literally.",
  },
  {
    id: "regex-escaped-dollar",
    category: "regex",
    level: "core",
    prompt: "Match a literal dollar sign followed by a digit.",
    answer: "\\$\\d",
    explanation:
      "`\\$` matches `$` literally; unescaped `$` is the end anchor.",
  },
  {
    id: "regex-escaped-caret",
    category: "regex",
    level: "core",
    prompt: "Match a literal caret character.",
    answer: "\\^",
    explanation:
      "`\\^` matches `^` literally; unescaped it's the start anchor (or class negation).",
  },
  {
    id: "regex-case-insensitive-flag",
    category: "regex",
    level: "core",
    prompt: "Match 'error', 'ERROR', or any case combination.",
    answer: "(?i)error",
    explanation:
      "The inline `(?i)` flag enables case-insensitive matching in many engines (or use the i flag).",
  },
  {
    id: "regex-multiline-flag",
    category: "regex",
    level: "core",
    prompt: "Make ^ and $ match at every line in a multi-line string.",
    answer: "(?m)^\\d",
    explanation:
      "With the `m` flag, `^` anchors at line starts, so each line is checked.",
  },
  {
    id: "regex-dotall-flag",
    category: "regex",
    level: "core",
    prompt: "Make the dot match newlines too.",
    answer: "(?s)foo.bar",
    explanation:
      "The `s` flag lets `.` match newline characters, so foo.bar spans lines.",
  },
  {
    id: "regex-global-flag",
    category: "regex",
    level: "core",
    prompt: "Match every occurrence instead of stopping at the first.",
    answer: "g",
    explanation:
      "The global flag (in JS `/pattern/g`) finds all matches, not just the first.",
  },
  {
    id: "regex-non-capturing",
    category: "regex",
    level: "core",
    prompt: "Group 'ab' for repetition without creating a capture group.",
    answer: "(?:ab)+",
    explanation:
      "`(?:…)` groups without capturing, so it doesn't shift your $1 references.",
  },
  {
    id: "regex-pipe-in-group",
    category: "regex",
    level: "core",
    prompt: "Match 'Mr.', 'Mrs.', or 'Ms.' as a unit.",
    answer: "M(?:r|rs|s)\\.",
    explanation:
      "Alternation inside a non-capturing group keeps the prefix and suffix tied together.",
  },
  {
    id: "regex-any-of-set",
    category: "regex",
    level: "core",
    prompt: "Match a digit or a hyphen.",
    answer: "[0-9-]",
    explanation:
      "Inside a class, a trailing hyphen is literal: digit or dash.",
  },
  {
    id: "regex-not-quote",
    category: "regex",
    level: "core",
    prompt: "Match a single character that isn't a double quote.",
    answer: "[^\"]",
    explanation:
      "Negated class matching anything except the quote character.",
  },
  {
    id: "regex-tab-newline",
    category: "regex",
    level: "core",
    prompt: "Match a tab OR a newline character.",
    answer: "[\\t\\n]",
    explanation:
      "Escape sequences inside a class cover both whitespace types.",
  },
  {
    id: "regex-crlf",
    category: "regex",
    level: "core",
    prompt: "Match a Windows line ending (CRLF).",
    answer: "\\r\\n",
    explanation:
      "Carriage return followed by line feed — the Windows newline pair.",
  },
  {
    id: "regex-unicode-letter",
    category: "regex",
    level: "workflow",
    prompt: "Match any letter including accented ones (é, ñ, ü).",
    answer: "\\p{L}",
    explanation:
      "The Unicode property `\\p{L}` matches any letter — use the u flag in JS/PCRE.",
  },
  {
    id: "regex-emoji-flag",
    category: "regex",
    level: "workflow",
    prompt: "Match any emoji character.",
    answer: "\\p{Extended_Pictographic}",
    explanation:
      "Unicode extended pictographic property covers most emoji (requires u flag).",
  },
  {
    id: "regex-account-username",
    category: "regex",
    level: "workflow",
    prompt: "Match a username: 3-16 letters, digits, or underscores.",
    answer: "^[A-Za-z0-9_]{3,16}$",
    explanation:
      "Anchored class with a length range — the standard username rule.",
  },
  {
    id: "regex-address-street",
    category: "regex",
    level: "workflow",
    prompt: "Match a street address like '123 Main St'.",
    answer: "^\\d+\\s+[A-Za-z .]+(St|Ave|Blvd|Rd)\\.?$",
    explanation:
      "House number, street name, and a road-type suffix with optional period.",
  },
  {
    id: "regex-zip-us",
    category: "regex",
    level: "core",
    prompt: "Match a US ZIP code (5 or 9 digits).",
    answer: "^\\d{5}(-\\d{4})?$",
    explanation:
      "Five digits with an optional dash-plus-four extension.",
  },
  {
    id: "regex-isbn",
    category: "regex",
    level: "core",
    prompt: "Match an ISBN-13 like 978-3-16-148410-0.",
    answer: "97[89]-\\d{1,5}-\\d{1,7}-\\d{1,7}-[\\dX]",
    explanation:
      "The 978/979 prefix followed by the ISBN-13 group structure.",
  },
  {
    id: "regex-log-line",
    category: "regex",
    level: "workflow",
    prompt: "Match a typical log line starting with a timestamp and level.",
    answer: "^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\] (INFO|WARN|ERROR)",
    explanation:
      "Bracketed timestamp then a log level via alternation — captures the level in group 1.",
  },
  {
    id: "regex-nginx-status",
    category: "regex",
    level: "workflow",
    prompt: "Extract the HTTP status code from an access log line.",
    answer: '" (\\d{3}) ',
    explanation:
      "The status code appears after a quote-space in common log format — capture it as a three-digit group.",
  },
  {
    id: "regex-apache-log-ip",
    category: "regex",
    level: "workflow",
    prompt: "Extract the client IP at the start of an Apache log line.",
    answer: "^(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})",
    explanation:
      "Anchored IPv4 capture — the first field of standard access logs.",
  },
  {
    id: "regex-json-key",
    category: "regex",
    level: "workflow",
    prompt: "Match the key 'name' in JSON: \"name\": ….",
    answer: '"name"\\s*:',
    explanation:
      "Quote, key, quote, optional space, colon — matches the JSON key with its colon.",
  },
  {
    id: "regex-string-between",
    category: "regex",
    level: "core",
    prompt: "Capture text between [START] and [END] markers.",
    answer: "\\[START\\](.*?)\\[END\\]",
    explanation:
      "Lazy `.*?` captures only the inner text between the literal markers.",
  },
  {
    id: "regex-first-word",
    category: "regex",
    level: "workflow",
    prompt: "Capture the first word of a line.",
    answer: "^(\\w+)",
    explanation:
      "Anchored word chars capture the first token before any whitespace.",
  },
  {
    id: "regex-last-word",
    category: "regex",
    level: "workflow",
    prompt: "Capture the last word of a line.",
    answer: "(\\w+)$",
    explanation:
      "Word chars at end-of-line capture the final token.",
  },
  {
    id: "regex-number-with-sign",
    category: "regex",
    level: "core",
    prompt: "Match a positive or negative integer.",
    answer: "[+-]?\\d+",
    explanation:
      "Optional sign followed by digits.",
  },
  {
    id: "regex-decimal",
    category: "regex",
    level: "core",
    prompt: "Match a decimal number like 3.14 or .5.",
    answer: "\\d*\\.\\d+",
    explanation:
      "Optional whole part, dot, required fraction — covers 0.5 and .5.",
  },
  {
    id: "regex-scientific",
    category: "regex",
    level: "core",
    prompt: "Match scientific notation like 1.5e10.",
    answer: "\\d+(\\.\\d+)?[eE][+-]?\\d+",
    explanation:
      "Mantissa with optional fraction, exponent marker, optional sign, exponent digits.",
  },
  {
    id: "regex-percentage",
    category: "regex",
    level: "core",
    prompt: "Match a percentage like 42.5%.",
    answer: "\\d+(\\.\\d+)?%",
    explanation:
      "Number with optional fraction immediately followed by a percent sign.",
  },
  {
    id: "regex-temperature",
    category: "regex",
    level: "core",
    prompt: "Match a temperature like 21°C.",
    answer: "-?\\d+(\\.\\d+)?°[CF]",
    explanation:
      "Optional minus, number, optional fraction, degree sign, C or F.",
  },
  {
    id: "regex-speed",
    category: "regex",
    level: "core",
    prompt: "Match a speed like 120 km/h.",
    answer: "\\d+\\s?km/h",
    explanation:
      "Digits, optional space, the km/h unit.",
  },
  {
    id: "regex-duration",
    category: "regex",
    level: "core",
    prompt: "Match a duration like 2h 30m.",
    answer: "\\d+h\\s?\\d+m",
    explanation:
      "Hours then minutes with an optional space between.",
  },
  {
    id: "regex-cardinal-direction",
    category: "regex",
    level: "core",
    prompt: "Match N, S, E, W, or combinations like NE.",
    answer: "^(N|S|E|W|NE|NW|SE|SW)$",
    explanation:
      "Explicit alternation of the eight compass points.",
  },
  {
    id: "regex-color-rgb",
    category: "regex",
    level: "core",
    prompt: "Match rgb(255, 0, 128) syntax.",
    answer: "rgb\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}\\)",
    explanation:
      "Escaped parens and commas with optional spaces between the three channels.",
  },
  {
    id: "regex-css-class",
    category: "regex",
    level: "core",
    prompt: "Match a CSS class selector like .button-primary.",
    answer: "\\.[a-z][a-z0-9-]*",
    explanation:
      "Dot followed by a name: letter first, then letters/digits/hyphens.",
  },
  {
    id: "regex-css-hex-short",
    category: "regex",
    level: "core",
    prompt: "Match short hex colors like #fff.",
    answer: "#[0-9a-fA-F]{3}\\b",
    explanation:
      "Hash plus exactly three hex digits at a word boundary.",
  },
  {
    id: "regex-variable-name",
    category: "regex",
    level: "core",
    prompt: "Match a valid JS variable name (letter/underscore/$ then word chars).",
    answer: "^[A-Za-z_$][\\w$]*$",
    explanation:
      "First char can't be a digit; the rest allows word chars and $.",
  },
  {
    id: "regex-python-var",
    category: "regex",
    level: "core",
    prompt: "Match a valid Python identifier (letters, digits, underscore).",
    answer: "^[A-Za-z_]\\w*$",
    explanation:
      "Starts with a letter or underscore, then any word characters.",
  },
  {
    id: "regex-command-line-arg",
    category: "regex",
    level: "workflow",
    prompt: "Match command-line flags like --verbose or -v.",
    answer: "--?[a-zA-Z][a-zA-Z0-9-]*",
    explanation:
      "One or two dashes, a letter, then flag characters.",
  },
  {
    id: "regex-env-var",
    category: "regex",
    level: "workflow",
    prompt: "Match shell variable references like $HOME or ${PATH}.",
    answer: "\\$(?:\\w+|\\{[A-Za-z_]+\\})",
    explanation:
      "Dollar followed by a name or a braced name — covers both syntaxes.",
  },
  {
    id: "regex-placeholder",
    category: "regex",
    level: "core",
    prompt: "Match template placeholders like {{name}}.",
    answer: "\\{\\{[\\w.]+\\}\\}",
    explanation:
      "Double braces around a name — common in template engines.",
  },
  {
    id: "regex-angular-binding",
    category: "regex",
    level: "core",
    prompt: "Match Angular event bindings like (click).",
    answer: "\\([a-z]+\\)",
    explanation:
      "Parenthesized lowercase name — the event-binding syntax.",
  },
  {
    id: "regex-markdown-heading",
    category: "regex",
    level: "workflow",
    prompt: "Match markdown H2 headings (## Title).",
    answer: "^##\\s+.+",
    explanation:
      "Two hashes, whitespace, then content at line start.",
  },
  {
    id: "regex-markdown-bold",
    category: "regex",
    level: "core",
    prompt: "Match bold markdown like **important**.",
    answer: "\\*\\*[^*]+\\*\\*",
    explanation:
      "Double asterisks around non-asterisk content.",
  },
  {
    id: "regex-markdown-link",
    category: "regex",
    level: "core",
    prompt: "Match a markdown link [text](url).",
    answer: "\\[[^\\]]+\\]\\([^)]+\\)",
    explanation:
      "Bracketed text then parenthesized URL, each a negated class.",
  },
  {
    id: "regex-markdown-code",
    category: "regex",
    level: "core",
    prompt: "Match inline code like `npm install`.",
    answer: "`[^`]+`",
    explanation:
      "Backticks around any non-backtick content.",
  },
  {
    id: "regex-list-item",
    category: "regex",
    level: "core",
    prompt: "Match a markdown bullet line like '- item'.",
    answer: "^-\\s+",
    explanation:
      "Hyphen bullet followed by whitespace at line start.",
  },
  {
    id: "regex-task-tag",
    category: "regex",
    level: "core",
    prompt: "Match TODO/FIXME/HACK tags in code comments.",
    answer: "\\b(TODO|FIXME|HACK)\\b",
    explanation:
      "Alternation of common tags at word boundaries — found with case-insensitive grep.",
  },
  {
    id: "regex-jira-key",
    category: "regex",
    level: "core",
    prompt: "Match a Jira ticket key like PROJ-123.",
    answer: "\\b[A-Z]{2,10}-\\d+\\b",
    explanation:
      "Uppercase project prefix, dash, issue number.",
  },
  {
    id: "regex-commit-short",
    category: "regex",
    level: "core",
    prompt: "Match a short 7-char git hash.",
    answer: "\\b[0-9a-f]{7}\\b",
    explanation:
      "Seven hex digits between boundaries — the abbreviated commit id.",
  },
  {
    id: "regex-multi-word-capitalized",
    category: "regex",
    level: "core",
    prompt: "Match CamelCase words like 'MyClassName'.",
    answer: "\\b[A-Z][a-z]+(?:[A-Z][a-z]*)+\\b",
    explanation:
      "Capital then lowercase, repeating — matches multi-word CamelCase.",
  },
  {
    id: "regex-snake-case",
    category: "regex",
    level: "core",
    prompt: "Match snake_case identifiers like 'my_var_name'.",
    answer: "^[a-z]+(_[a-z]+)+$",
    explanation:
      "Lowercase words joined by single underscores.",
  },
  {
    id: "regex-kebab-case",
    category: "regex",
    level: "core",
    prompt: "Match kebab-case identifiers like 'my-var-name'.",
    answer: "^[a-z]+(-[a-z]+)+$",
    explanation:
      "Lowercase words joined by single hyphens.",
  },
  {
    id: "regex-pascal-case",
    category: "regex",
    level: "core",
    prompt: "Match PascalCase like 'UserProfileService'.",
    answer: "^[A-Z][a-zA-Z0-9]*$",
    explanation:
      "Starts uppercase and allows mixed case — the PascalCase shape.",
  },
  {
    id: "regex-password-lower-upper",
    category: "regex",
    level: "workflow",
    prompt: "Require both an uppercase and a lowercase letter.",
    answer: "(?=.*[a-z])(?=.*[A-Z])",
    explanation:
      "Two lookaheads verify each case class appears somewhere in the string.",
  },
  {
    id: "regex-username-lookahead",
    category: "regex",
    level: "workflow",
    prompt: "Match a username that must contain at least one digit.",
    answer: "^(?=.*\\d)[A-Za-z\\d_]{3,16}$",
    explanation:
      "Lookahead requires a digit; the class+range enforce the format.",
  },
  {
    id: "regex-domain",
    category: "regex",
    level: "core",
    prompt: "Match a domain like sub.example.co.uk.",
    answer: "^(?:[a-z0-9-]+\\.)+[a-z]{2,}$",
    explanation:
      "Repeated labels then a TLD of at least two letters.",
  },
  {
    id: "regex-subdomain",
    category: "regex",
    level: "workflow",
    prompt: "Extract the subdomain from 'api.example.com'.",
    answer: "^(\\w+)\\.[^.]+\\.[^.]+$",
    explanation:
      "First label is group 1, then domain and TLD — a simplistic but workable split.",
  },
  {
    id: "regex-host-port",
    category: "regex",
    level: "core",
    prompt: "Match host:port like localhost:3000.",
    answer: "^[a-zA-Z0-9.-]+:\\d{2,5}$",
    explanation:
      "Host name then colon then a 2-5 digit port.",
  },
  {
    id: "regex-ip-port",
    category: "regex",
    level: "core",
    prompt: "Match IP:port like 192.168.0.1:8080.",
    answer: "^(\\d{1,3}\\.){3}\\d{1,3}:\\d{2,5}$",
    explanation:
      "IPv4 dotted quad, colon, port.",
  },
  {
    id: "regex-mac-colonless",
    category: "regex",
    level: "core",
    prompt: "Match a colonless MAC like aabbccddeeff.",
    answer: "^[0-9a-f]{12}$",
    explanation:
      "Exactly twelve hex digits with no separators.",
  },
  {
    id: "regex-stock-ticker",
    category: "regex",
    level: "core",
    prompt: "Match a stock ticker like AAPL.",
    answer: "^[A-Z]{1,5}$",
    explanation:
      "One to five uppercase letters — the NYSE/NASDAQ ticker shape.",
  },
  {
    id: "regex-airport-code",
    category: "regex",
    level: "core",
    prompt: "Match an IATA airport code like JFK.",
    answer: "^[A-Z]{3}$",
    explanation:
      "Exactly three uppercase letters.",
  },
  {
    id: "regex-room-number",
    category: "regex",
    level: "core",
    prompt: "Match a room number like 12A.",
    answer: "^\\d{1,4}[A-Z]?$",
    explanation:
      "One to four digits with an optional trailing letter.",
  },
  {
    id: "regex-license-plate",
    category: "regex",
    level: "workflow",
    prompt: "Match a US-style plate: 1-7 letters/digits/space.",
    answer: "^[A-Z0-9 ]{1,7}$",
    explanation:
      "Anchored class allowing letters, digits, and spaces within the length range.",
  },
  {
    id: "regex-remove-html-tags",
    category: "regex",
    level: "workflow",
    prompt: "Match HTML tags to strip them from text.",
    answer: "<[^>]+>",
    explanation:
      "Anything from `<` to the first `>` — the standard tag-stripping regex.",
  },
  {
    id: "regex-remove-comments",
    category: "regex",
    level: "workflow",
    prompt: "Match C-style block comments /* … */.",
    answer: "/\\*[\\s\\S]*?\\*/",
    explanation:
      "`[\\s\\S]` matches any char including newlines, lazily, between comment markers.",
  },
  {
    id: "regex-single-line-comment",
    category: "regex",
    level: "workflow",
    prompt: "Match shell comments starting with #.",
    answer: "#.*$",
    explanation:
      "Hash then anything to end of line — but avoid matching inside strings.",
  },
  {
    id: "regex-remove-dup-lines",
    category: "regex",
    level: "workflow",
    prompt: "Match a duplicate line so you can delete repeats (with sort -u style).",
    answer: "^(.*)$(?=\\n\\1$)",
    explanation:
      "Captures a line and looks ahead for an identical next line — the multi-line dup detector.",
  },
  {
    id: "regex-insert-comma",
    category: "regex",
    level: "workflow",
    prompt: "Match the end of each number line to append a comma.",
    answer: "(\\d+)$",
    explanation:
      "Capture the trailing number; in replacement use `$1,` to add a comma.",
  },
  {
    id: "regex-wrap-quotes",
    category: "regex",
    level: "workflow",
    prompt: "Match bare words to wrap them in quotes: hello → \"hello\".",
    answer: "^([a-z]+)$",
    explanation:
      "Capture the word and replace with `\"$1\"` in the substitution.",
  },
  {
    id: "regex-extract-numbers",
    category: "regex",
    level: "workflow",
    prompt: "Extract every number from a mixed line.",
    answer: "\\d+(\\.\\d+)?",
    explanation:
      "Integers with optional decimal part — the numbers to pull out.",
  },
  {
    id: "regex-keep-letters",
    category: "regex",
    level: "workflow",
    prompt: "Strip everything that isn't a letter from a string.",
    answer: "[^A-Za-z]",
    explanation:
      "Match non-letters; deleting them leaves only the alphabetics.",
  },
  {
    id: "regex-title-case-words",
    category: "regex",
    level: "workflow",
    prompt: "Match word-start letters to capitalize in a title.",
    answer: "\\b\\w",
    explanation:
      "The first character of each word — replace with an uppercase version.",
  },
  {
    id: "regex-space-to-dash",
    category: "regex",
    level: "workflow",
    prompt: "Match spaces in a filename to convert to dashes.",
    answer: "\\s+",
    explanation:
      "Runs of whitespace become a single dash in the replacement.",
  },
  {
    id: "regex-underscore-to-space",
    category: "regex",
    level: "workflow",
    prompt: "Match underscores in text to convert them to spaces.",
    answer: "_+",
    explanation:
      "One or more underscores — replace with a space to un-slug text.",
  },
  {
    id: "regex-phone-intl",
    category: "regex",
    level: "core",
    prompt: "Match an international phone like +1 555 123 4567.",
    answer: "^\\+\\d{1,3}[ \\d]{6,14}$",
    explanation:
      "Plus, country code, then digits/spaces for the number part.",
  },
  {
    id: "regex-binary-number",
    category: "regex",
    level: "core",
    prompt: "Match a binary number like 101101.",
    answer: "^[01]+$",
    explanation:
      "Only zeros and ones, anchored — a binary literal.",
  },
  {
    id: "regex-hex-number",
    category: "regex",
    level: "core",
    prompt: "Match a hex literal like 0x1A3F.",
    answer: "^0[xX][0-9a-fA-F]+$",
    explanation:
      "0x prefix (either case) followed by hex digits.",
  },
  {
    id: "regex-octal-number",
    category: "regex",
    level: "core",
    prompt: "Match an octal literal like 0755.",
    answer: "^0[0-7]+$",
    explanation:
      "Leading zero then octal digits 0-7.",
  },
  {
    id: "regex-scientific-negative",
    category: "regex",
    level: "core",
    prompt: "Match negative scientific notation like -2.5e-3.",
    answer: "-?\\d+(\\.\\d+)?[eE][+-]?\\d+",
    explanation:
      "Optional leading minus plus the full scientific shape.",
  },
  {
    id: "regex-first-capital",
    category: "regex",
    level: "workflow",
    prompt: "Match a sentence starting with a capital letter.",
    answer: "^[A-Z][^\\.!?]*[\\.!?]",
    explanation:
      "Capital start, content without sentence punctuation, then a terminator.",
  },
  {
    id: "regex-acronym",
    category: "regex",
    level: "core",
    prompt: "Match an acronym like 'NASA' (all caps, 2+ letters).",
    answer: "\\b[A-Z]{2,}\\b",
    explanation:
      "Two or more uppercase letters between word boundaries.",
  },
  {
    id: "regex-roman-numeral",
    category: "regex",
    level: "workflow",
    prompt: "Match a roman numeral like XIV.",
    answer: "^(?=[MDCLXVI])M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$",
    explanation:
      "The canonical roman numeral pattern with lookahead guard and subtractive pairs.",
  },
  {
    id: "regex-bracket-balanced",
    category: "regex",
    level: "workflow",
    prompt: "Match text inside one level of nested parentheses.",
    answer: "\\(([^()]*)\\)",
    explanation:
      "Parens containing no parens — matches innermost pairs only.",
  },
  {
    id: "regex-string-not-included",
    category: "regex",
    level: "core",
    prompt: "Match lines that do NOT contain 'secret'.",
    answer: "^(?!.*secret).*$",
    explanation:
      "A negative lookahead rejects lines containing 'secret', then matches the rest.",
  },
  {
    id: "regex-only-whitespace",
    category: "regex",
    level: "core",
    prompt: "Match a string that is entirely whitespace.",
    answer: "^\\s+$",
    explanation:
      "Start, one-or-more whitespace, end — no visible characters at all.",
  },
  {
    id: "regex-empty-string",
    category: "regex",
    level: "core",
    prompt: "Match an empty string.",
    answer: "^$",
    explanation:
      "Start immediately followed by end — matches only the empty string.",
  },
  {
    id: "regex-optional-captures",
    category: "regex",
    level: "workflow",
    prompt: "Parse 'Name: Alice' capturing Alice as group 1.",
    answer: "Name:\\s*(.+)",
    explanation:
      "Literal label, colon, whitespace, then capture the value.",
  },
  {
    id: "regex-key-value",
    category: "regex",
    level: "workflow",
    prompt: "Parse generic key=value pairs.",
    answer: "(\\w+)=(\\w+)",
    explanation:
      "Two captures around the equals sign — key in group 1, value in group 2.",
  },
  {
    id: "regex-yaml-indent",
    category: "regex",
    level: "workflow",
    prompt: "Match an indented YAML list item like '  - item'.",
    answer: "^\\s+-\\s+.+",
    explanation:
      "Leading whitespace, dash, whitespace, content — the list-item shape.",
  },
  {
    id: "regex-docker-env-line",
    category: "regex",
    level: "workflow",
    prompt: "Match a Dockerfile ENV line like 'ENV PORT=8080'.",
    answer: "^ENV\\s+(\\w+)=(\\S+)",
    explanation:
      "ENV keyword, variable name, equals, value — capturing both parts.",
  },
  {
    id: "regex-git-status-line",
    category: "regex",
    level: "workflow",
    prompt: "Match a modified file line from 'git status --short' ( M file).",
    answer: "^ M (.+)$",
    explanation:
      "Leading space + M (modified in worktree) then capture the path.",
  },
  {
    id: "regex-commit-conventional",
    category: "regex",
    level: "workflow",
    prompt: "Match a conventional commit like 'feat(api): add endpoint'.",
    answer: "^(feat|fix|docs|chore|refactor|test|perf)(\\(\\w+\\))?!?: .+",
    explanation:
      "Type, optional scope and breaking marker, colon, space, description.",
  },
  {
    id: "regex-semver-full",
    category: "regex",
    level: "workflow",
    prompt: "Match full semver including prerelease: 1.2.3-beta.1.",
    answer: "^\\d+\\.\\d+\\.\\d+(-[0-9A-Za-z-.]+)?$",
    explanation:
      "Core version with an optional dash-prefixed prerelease suffix.",
  },
  {
    id: "regex-file-size",
    category: "regex",
    level: "core",
    prompt: "Match a size like 12.5MB.",
    answer: "\\d+(\\.\\d+)?\\s?(KB|MB|GB|TB)",
    explanation:
      "Number, optional fraction, optional space, then a size unit.",
  },
  {
    id: "regex-geo-coords",
    category: "regex",
    level: "workflow",
    prompt: "Match coordinates like 40.7128, -74.0060.",
    answer: "-?\\d+\\.\\d+,\\s*-?\\d+\\.\\d+",
    explanation:
      "Signed decimals separated by a comma and optional space.",
  },
  {
    id: "regex-time-with-seconds",
    category: "regex",
    level: "core",
    prompt: "Match a timestamp like 12:34:56.",
    answer: "^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$",
    explanation:
      "Validated hours, minutes, and seconds with colons.",
  },
  {
    id: "regex-weekday",
    category: "regex",
    level: "core",
    prompt: "Match a day of the week (Mon–Sun).",
    answer: "^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)",
    explanation:
      "Alternation of the three-letter weekday abbreviations.",
  },
  {
    id: "regex-month-name",
    category: "regex",
    level: "core",
    prompt: "Match a month name like January.",
    answer: "^(January|February|March|April|May|June|July|August|September|October|November|December)$",
    explanation:
      "Full month names via alternation — long but explicit.",
  },
  {
    id: "regex-quarter",
    category: "regex",
    level: "core",
    prompt: "Match a fiscal quarter like Q3.",
    answer: "^Q[1-4]$",
    explanation:
      "Q followed by a digit 1-4.",
  },
  {
    id: "regex-log-level-only",
    category: "regex",
    level: "core",
    prompt: "Match standalone log levels: INFO, WARN, ERROR, DEBUG.",
    answer: "\\b(INFO|WARN|ERROR|DEBUG)\\b",
    explanation:
      "Alternation of levels at word boundaries — easy case-insensitive grep.",
  },
  {
    id: "regex-sql-string",
    category: "regex",
    level: "workflow",
    prompt: "Match SQL string literals with doubled single quotes.",
    answer: "'(''|[^'])*'",
    explanation:
      "Allows escaped '' and any non-quote char inside the literal.",
  },
  {
    id: "regex-js-number-hex-or-dec",
    category: "regex",
    level: "core",
    prompt: "Match a JS number: decimal or 0x hex.",
    answer: "(?:0[xX][0-9a-fA-F]+|\\d+(?:\\.\\d+)?)",
    explanation:
      "Alternation between hex literals and decimal forms.",
  },
  {
    id: "regex-python-float",
    category: "regex",
    level: "core",
    prompt: "Match a Python float like 3.0 or 1e5.",
    answer: "\\d+\\.\\d+|\\d+[eE][+-]?\\d+",
    explanation:
      "Either a decimal point form or exponent notation.",
  },
  {
    id: "regex-golang-import",
    category: "regex",
    level: "workflow",
    prompt: "Match a Go import path like github.com/user/pkg.",
    answer: "^[a-z0-9.]+\\.[a-z0-9.-]+/[A-Za-z0-9_./-]+$",
    explanation:
      "Domain-ish prefix then the module path — a practical Go import pattern.",
  },
  {
    id: "regex-python-decorator",
    category: "regex",
    level: "workflow",
    prompt: "Match a Python decorator like @app.route.",
    answer: "^@\\w+(\\.\\w+)*",
    explanation:
      "At-sign, dotted name chain — matches decorators at line start.",
  },
  {
    id: "regex-css-import",
    category: "regex",
    level: "core",
    prompt: "Match a CSS import line: @import 'reset.css';",
    answer: "^@import\\s+['\"][^'\"]+['\"];",
    explanation:
      "Keyword, whitespace, quoted path, semicolon.",
  },
  {
    id: "regex-xml-tag",
    category: "regex",
    level: "core",
    prompt: "Match an XML tag with attributes like <item id=\"1\">.",
    answer: "<[a-zA-Z][a-zA-Z0-9]*([^>]*)>",
    explanation:
      "Tag name plus any attributes up to the closing bracket.",
  },
  {
    id: "regex-xml-selfclose",
    category: "regex",
    level: "core",
    prompt: "Match a self-closing XML tag like <br />.",
    answer: "<[a-zA-Z][^>]*/>",
    explanation:
      "Tag content ending in `/>` — the self-closing form.",
  },
  {
    id: "regex-json-bool",
    category: "regex",
    level: "core",
    prompt: "Match JSON booleans true or false.",
    answer: "\\b(true|false)\\b",
    explanation:
      "Alternation of the two JSON literal booleans.",
  },
  {
    id: "regex-json-null",
    category: "regex",
    level: "core",
    prompt: "Match the JSON null literal.",
    answer: "\\bnull\\b",
    explanation:
      "The literal null at word boundaries.",
  },
  {
    id: "regex-yaml-bool",
    category: "regex",
    level: "core",
    prompt: "Match YAML booleans: true/false/yes/no/on/off.",
    answer: "\\b(true|false|yes|no|on|off)\\b",
    explanation:
      "YAML accepts several spellings for booleans — alternation covers them.",
  },
  {
    id: "regex-snake-case-words",
    category: "regex",
    level: "workflow",
    prompt: "Split camelCase 'myVarName' into words (match each word part).",
    answer: "[A-Z]?[a-z]+|[A-Z]+(?=[A-Z]|$)",
    explanation:
      "Matches each word component in camelCase for splitting.",
  },
  {
    id: "regex-abbrev-code",
    category: "regex",
    level: "core",
    prompt: "Match 2-letter state codes like CA, NY.",
    answer: "^[A-Z]{2}$",
    explanation:
      "Exactly two uppercase letters — the US state abbreviation shape.",
  },
  {
    id: "regex-postal-uk",
    category: "regex",
    level: "core",
    prompt: "Match a UK postcode like SW1A 1AA.",
    answer: "^[A-Z]{1,2}\\d[A-Z\\d]? \\d[A-Z]{2}$",
    explanation:
      "The outward code, space, then the inward code — the UK postcode skeleton.",
  },
  {
    id: "regex-region-north",
    category: "regex",
    level: "core",
    prompt: "Match strings starting with the word 'North'.",
    answer: "^North\\b",
    explanation:
      "Anchored word with a boundary so 'Northwest' doesn't short-match.",
  },
  {
    id: "regex-double-space",
    category: "regex",
    level: "workflow",
    prompt: "Match two consecutive spaces in text.",
    answer: " {2,}",
    explanation:
      "Two or more literal spaces — the typographic double-space bug.",
  },
  {
    id: "regex-apostrophe",
    category: "regex",
    level: "core",
    prompt: "Match words containing an apostrophe like don't.",
    answer: "\\b\\w+'\\w+\\b",
    explanation:
      "Word chars, apostrophe, word chars — contraction words.",
  },
  {
    id: "regex-hyphenated",
    category: "regex",
    level: "core",
    prompt: "Match hyphenated words like state-of-the-art.",
    answer: "\\b\\w+(?:-\\w+)+\\b",
    explanation:
      "A word followed by one or more hyphen-joined words.",
  },
  {
    id: "regex-timezone",
    category: "regex",
    level: "core",
    prompt: "Match a timezone offset like UTC+05:30.",
    answer: "UTC[+-]\\d{2}:?\\d{2}",
    explanation:
      "UTC, sign, hours, optional colon, minutes.",
  },
  {
    id: "regex-file-mode",
    category: "regex",
    level: "core",
    prompt: "Match a file permission octal like 0755.",
    answer: "^0?[0-7]{3,4}$",
    explanation:
      "Optional leading zero and 3-4 octal digits — a chmod-style mode.",
  },
  {
    id: "regex-port-number",
    category: "regex",
    level: "core",
    prompt: "Match a valid TCP port number (1-65535).",
    answer: "^([1-9]\\d{0,3}|[1-5]\\d{4}|6[0-4]\\d{3}|65[0-4]\\d{2}|655[0-2]\\d|6553[0-5])$",
    explanation:
      "The full numeric range pattern for valid port numbers.",
  },
  {
    id: "regex-http-status-2xx",
    category: "regex",
    level: "core",
    prompt: "Match 2xx HTTP status codes (200-299).",
    answer: "^2\\d{2}$",
    explanation:
      "Two followed by any two digits — the success range.",
  },
  {
    id: "regex-http-status-5xx",
    category: "regex",
    level: "core",
    prompt: "Match 5xx HTTP status codes.",
    answer: "^5\\d{2}$",
    explanation:
      "Five followed by any two digits — server error range.",
  },
  {
    id: "regex-pid",
    category: "regex",
    level: "core",
    prompt: "Match a process id (1-4194304 range).",
    answer: "^[1-9]\\d{0,6}$",
    explanation:
      "A nonzero first digit with up to six more — the practical pid shape.",
  },
  {
    id: "regex-array-index",
    category: "regex",
    level: "core",
    prompt: "Match array accesses like arr[0].",
    answer: "\\w+\\[\\d+\\]",
    explanation:
      "Identifier, open bracket, digits, close bracket.",
  },
  {
    id: "regex-method-call",
    category: "regex",
    level: "core",
    prompt: "Match a method call like obj.method(args).",
    answer: "\\w+\\.\\w+\\([^)]*\\)",
    explanation:
      "Dotted name then parens with any non-paren args.",
  },
  {
    id: "regex-assignment",
    category: "regex",
    level: "core",
    prompt: "Match a variable assignment like x = 42.",
    answer: "^\\s*\\w+\\s*=\\s*[^;]+",
    explanation:
      "Name, optional spaces, equals, optional spaces, value.",
  },
  {
    id: "regex-import-statement",
    category: "regex",
    level: "workflow",
    prompt: "Match a JS import statement.",
    answer: "^import\\s+.*from\\s+['\"].+['\"];?$",
    explanation:
      "Import keyword, binding, from, quoted module path.",
  },
  {
    id: "regex-export-statement",
    category: "regex",
    level: "workflow",
    prompt: "Match a JS export statement like export default foo;",
    answer: "^export\\s+(default\\s+)?\\w+",
    explanation:
      "Export keyword with optional default modifier and a name.",
  },
  {
    id: "regex-require-call",
    category: "regex",
    level: "core",
    prompt: "Match a CommonJS require call.",
    answer: "require\\(['\"][^'\"]+['\"]\\)",
    explanation:
      "require, parens, quoted module path — the CJS import form.",
  },
  {
    id: "regex-template-literal",
    category: "regex",
    level: "core",
    prompt: "Match a JS template literal containing ${expression}.",
    answer: "`[^`]*\\$\\{[^}]+\\}[^`]*`",
    explanation:
      "Backtick string containing at least one ${…} interpolation.",
  },
  {
    id: "regex-string-escape",
    category: "regex",
    level: "core",
    prompt: "Match escaped characters in strings like \\n.",
    answer: "\\\\[nrt\\\\\"']",
    explanation:
      "Backslash followed by a common escape letter or quote.",
  },
  {
    id: "regex-code-block-brace",
    category: "regex",
    level: "workflow",
    prompt: "Match a balanced single-level { } code block.",
    answer: "\\{[^{}]*\\}",
    explanation:
      "Braces containing no nested braces — matches innermost blocks.",
  },
  {
    id: "regex-function-signature",
    category: "regex",
    level: "workflow",
    prompt: "Match a function signature like function foo(a, b).",
    answer: "function\\s+\\w+\\s*\\([^)]*\\)",
    explanation:
      "Keyword, name, optional space, parens with args.",
  },
  {
    id: "regex-generic-type",
    category: "regex",
    level: "core",
    prompt: "Match a TypeScript generic like Array<string>.",
    answer: "\\w+<[\\w, \\[\\]]+>",
    explanation:
      "Identifier with angle-bracketed type arguments.",
  },
  {
    id: "regex-css-variable",
    category: "regex",
    level: "core",
    prompt: "Match a CSS custom property like var(--color).",
    answer: "var\\(--[a-z0-9-]+\\)",
    explanation:
      "var(), double dash, then the property name.",
  },
  {
    id: "regex-html-id",
    category: "regex",
    level: "core",
    prompt: "Match an HTML id attribute like id=\"main\".",
    answer: "id=\"[^\"]+\"",
    explanation:
      "Literal id attribute with a quoted value.",
  },
  {
    id: "regex-html-class",
    category: "regex",
    level: "core",
    prompt: "Match a class attribute like class=\"btn primary\".",
    answer: "class=\"[^\"]*\"",
    explanation:
      "Literal class attribute with a possibly-empty quoted value.",
  },
  {
    id: "regex-data-attr",
    category: "regex",
    level: "core",
    prompt: "Match a data-* attribute like data-user-id=\"5\".",
    answer: "data-[a-z-]+=\"[^\"]*\"",
    explanation:
      "data- prefix, attribute name, quoted value.",
  },
];
