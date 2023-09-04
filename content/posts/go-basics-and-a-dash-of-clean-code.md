---
title: "Go: Basics and a Dash of Clean Code"
date: "2023-09-03T19:31:57+05:30"
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya" #do not include @
cover: ""
tags: ["go", "basics", "clean code"]
keywords:
  [
    "go",
    "golang",
    "basics of go",
    "clean code",
    "go syntax",
    "go programming for beginners",
    "go programming tips",
    "learning go",
    "go programming",
    "writing clean code in go",
  ]
description: "Welcome to guide on Go programming! Wheter you're beginner looking to grasp the basics of the language or an experience developer seeking to enhance your clean code skills, our blog has you covered. Explore the fundamentals of Go syntax and discover how to elevate your coding style with a touch of clean code principles."
showFullContent: false
readingTime: true
hideComments: false
draft: true
toc: true
---

---

If you have read my first blog [Let's Go]({{< ref "/posts/lets-go.md" >}}), which is not about the Go programming language, go check it out 😅. You can easily tell how much I am obsessed with the Go programming language. After writing my first blog, I have done some thinking, like where to start my Go programming series blog. I have done some research and collected some [notes]({{< ref "/notes/go.md" >}}).

As you read the heading of the blog, I will cover some of the basics that I think are important for anyone starting a programming language that also follows some of the principles of clean code. The topics that I have covered in this blog are the effective way you write your Go code and questions that arise in my mind when I have studied Golang, like why there are different types of variable declarations. Why have they created the Go programming language?

Let's find the answer's:

<!-- {{< image src="https://media.giphy.com/media/18JYFP4HONtyNUmYSN/giphy.gif" alt="lets find out" position="center" style="border-radius: 8px; width: 480px; height: 270px;" >}} -->

## History of Go

Back in 2007, the search engine Google had a problem. They had to maintain programs with millions of lines of code. Before they could try out any new changes, they had to turn this code into a working program, a process that at that time took almost an hour. Google's other problem is string processing. Google reads and analyzes a lot of web pages, which are text files. This was obviously not good for the developers because it made them less productive.

So Google engineers [Robert Griesemer](https://en.wikipedia.org/wiki/Robert_Griesemer), [Rob Pike](https://en.wikipedia.org/wiki/Rob_Pike), and [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson) sketeched out some goals for a new language:

- Fast Compilation (Efficiency)
- Less cumbersome code (Simplicity)
- Unused memory freed automatically (Grabage Collection)
- Easy-to-write software that does several oeprations simultaneously (Concurrency)
- Good support for processor with multiple cores

After a couple years of work, Google had created Go: a lanaguage that was fast to write code and produced programs that were fast to compile and run. Google built a rich library of string functions into Go, Grabage Collecting makes strings in Go simple to think about, and efficinet in ways some other string libraries are not. The project switched to an open source license in 2009. It’s now free for anyone to use.

If you're developing a command-line tool in Go, you can generate executable files for Windows, MacOS, and Linux using the same source code. If you're building a web server, Go can assist you in efficiently managing multiple simultaneous user connections. Regardless of your project's nature, Go will aid you in making your code easier to maintain.

---

Let's start with sytanx and clean code principles :

## Go file layout

Now let’s look at the code and figure out what it actually means…

<!-- prettier-ignore-start -->
{{< code language="go" title="Hello World" expand="Show" collapse="Hide" isCollapsed="false" >}}
package main

import "fmt"

func main() {
    fmt.Println("Hello, World")
}
{{< /code >}}
<!-- prettier-ignore-end -->

Every Go file has three sections:

1. The `package` clause
2. Any `import` statements
3. The actual `code`

- `Package` : A package in Go is a way to organize and structure code into meaningful units, helping with code organization and reusability. It allows control over visibility, promoting encapsulation and dependency management. The `main` package serves as the entry point for Go programs.

- `import` : Go files almost always have one or more `import` statements. In Go, the `import` statement is used to bring in external packages that your code relies on. It ensures that your program loads only the necessary packages, making it faster and more efficient than loading everything at once.

- `actual code` : The last part of every Go file is the actual code, which is often split up into one or more functions. A `function` is a group of code that you `call (run)` from other places in your program. When a Go program is run, it looks for a function named `main` and runs that first, which is why we need this function `main`.

Below is the code with what it does in comments:

<!-- prettier-ignore-start -->
{{< code language="go" title="Hello World" expand="Show" collapse="Hide" isCollapsed="false" >}}
// This line says the rest of the code in 
// this file belongs to the "main" package
package main 

// This says we will be using text-formatting
// code from the "fmt" package
import "fmt"

// The "main" function is special; it gets run
// first when your program runs.
func main() {
    // This line diplays ("print") "Hello, World" in
    // your terminal (or web browser, if you're using the Go Playground)
    //
    // It does this by calling the "Println" function
    // from the "fmt" package
    fmt.Println("Hello, World")
}
{{< /code >}}
<!-- prettier-ignore-end -->

- `Function` : A function is a group of one or more lines of code that you can call (run) from other places in your program.

> Note: When a Go program is run, it looks for a function named `main` and runs that first.

## No Semicolons

As you can see in our programme, there are no semicolons to separate statements in Go; we can use semicolons, but it’s not required (in fact, it’s generally frowned upon). This design choice was made to enhance code readability and reduce the potential for common programming errors.

Like [C](<https://en.wikipedia.org/wiki/C_(programming_language)>), Go's formal grammar uses semicolons to terminate statements, but unlike in [C](<https://en.wikipedia.org/wiki/C_(programming_language)>), those semicolons do not appear in the source. Instead, the [lexer](https://en.wikipedia.org/wiki/Lexical_analysis) uses a simple rule to insert semicolons automatically as it scans, so the input text is mostly free of them.

### How does it know when to add semicolons?

The rule is this: If a line ends with an identifier (like words such as `int` or `float64`), a basic value such as a number or a string, or certain specific tokens like

`break continue fallthrough return ++ -- ) }`

The Go lexer then adds a semicolon after that token when it encounters a newline.

To put it simply, when there's a chance that a newline could end a statement, Go automatically inserts a semicolon.

One consequence of the semicolon insertion rules is that you cannot put the opening brace of a control structure like `if`, `for`, `switch`, or `select` on the new line. If you do, a semicolon will inserted before the brace, which could cause unwanted effects. So write them like below:

<!-- prettier-ignore-start -->
{{< code language="go" title="if statement" expand="Show" collapse="Hide" isCollapsed="false" >}}
if i < f() {
    g()
}
{{< /code >}}
<!-- prettier-ignore-end -->

not like this:

<!-- prettier-ignore-start -->
{{< code language="go" title="bad if statement" expand="Show" collapse="Hide" isCollapsed="false" >}}
if i < f()  // wrong!
{           // wrong!
    g()
}
{{< /code >}}
<!-- prettier-ignore-end -->

## Formatting

Formatting issues are the most contentious but the least important. People may prefer different formatting styles, so when another developer or person reads the same code, it may take some time for him to grasp if he is not accustomed to the same formatting style. It will be easier if everyone formats their documents the same way.

Go takes an unusual approach and lets the machine take care of most formatting issues. The Go compiler comes with a standard formatting tool called `go fmt`. This tool reads a Go programme and automatically formats it with consistent indentation, alignment, and comment retention or adjustment to match a standard style.

Next time, whenever you share your code, other Go developers will expect it to be in the standard Go format. With **_Go, all you have to do is run `go fmt`_**.

If you want to try its simple version, head over to the [Go playground](https://go.dev/play), write some unformatted code, and hit the `format` button.

## Comments

In Go, developers write text annotations within the source code as comments. These annotations are not executed by the programme but serve as notes, explanations, or documentation. Comments are essential for providing context, making code more understandable, and documenting code for future reference.

Go provides C-style `/**/` block comments and C++-style `//` line comments.

1. Single-line comments: Single-line comments start with two slashes `//` and continue until the end of the line. They are used for adding brief explanations or clarifications to a specific line of code.

<!-- prettier-ignore-start -->
{{< code language="go" title="Single-line comment" expand="Show" collapse="Hide" isCollapsed="false" >}}

// This is a single-line comment in Go.
var x int // This comment explains the purpose of the variable.

{{< /code >}}
<!-- prettier-ignore-end -->

2. Multi-line comments: Multi-line comments are enclosed within `/*` and `*/` and can span multiple lines. They are commonly used for documenting larger sections of code, writing package-level documentation, or providing more detailed explanations.

<!-- prettier-ignore-start -->
{{< code language="go" title="Multi-line comment" expand="Show" collapse="Hide" isCollapsed="false" >}}

/*
This is a multi-line comment in Go.
It can span multiple lines and is useful for providing
detailed explanations or comments for larger code blocks.
*/

{{< /code >}}
<!-- prettier-ignore-end -->

Go also has a convention for documenting exported (public) identifiers and packages using special comments, often referred to as "comment annotations" or "comments for the `godoc` tool". These comments are structured in a way that allows the godoc tool to automatically generate documentation based on them.

For documenting exported identifiers, you can use a comment placed directly before the identifier, starting with the identifier name and a brief description:

<!-- prettier-ignore-start -->
{{< code language="go" title="Sample Go Doc Comment" expand="Show" collapse="Hide" isCollapsed="false" >}}

// MyFunction is a public function that performs a specific task.
func MyFunction() {
    // Function implementation...
}

{{< /code >}}
<!-- prettier-ignore-end -->

For package-level documentation, you can include a comment at the top of the file:

<!-- prettier-ignore-start -->
{{< code language="go" title="Package level doc comment" expand="Show" collapse="Hide" isCollapsed="false" >}}

// Package mypackage provides functionality for...
package mypackage

import "fmt"

// ExportedFunction is a function that...
func ExportedFunction() {
    // Function implementation...
}

{{< /code >}}
<!-- prettier-ignore-end -->

To generate documentation from these comments, you can use the godoc command-line tool. Running godoc on your Go code will produce documentation that includes your comments, making it easier for others to understand and use your code. Properly documented code is not only more understandable but also encourages collaboration and code maintenance.

## Names

Names are as important in Go as in any other language. When coding, we should consider naming variables, functions, arguments, classes, packages, source files, and directories that contain those source files.

> According to the book `Clean Code` by `Robert C. Martin`, there are some standards for naming:
>
> 1. Choose descriptive and unambiguous names.
> 2. Make a meaningful distinction.
> 3. Use pronounceable names.
> 4. Use searchable names.
> 5. Replace magic numbers with named constants.
> 6. Avoid encodings. Don't append prefixes or type information.
>
> You can check this points in detail in this [blog](https://medium.com/@pabashani.herath/clean-code-naming-conventions-4cac223de3c6)

Go has one simple set of rules that apply to the names of variables, functions, and types:

- A name must begin with a letter and can have any number of additional letters and numbers.
- The visibility of a name (variable, function, and type names) outside a package is determined by the following points:
  - If the name of a variable, function, or type begins with a **_Capital letter_**, it is considered as **_Exported_** and can be accessed from a package outside the current one. Example - As you have seen in the above [hello world program](#go-file-layout). The `P` in `fmt.Println` is capitalized: so it can be used from the main package or any other.
  - If the name begins with a **_Lowercase letter_**, it is considered **_Unexported_** and can only be accessed within the current package.

Above are the only rules that are enforced but the Go language. But `Go Community` follows some additional conventions as well:

- When naming something in Go, like a variable or function, use [CamelCase](https://en.wikipedia.org/wiki/Camel_case). This means that if the name has more than one word, start with a lowercase letter for the first word and then capitalize the first letter of each following word without using spaces. For example, `topRank` and `RetryConnection` are in CamelCase, which looks like camel humps.
- If a name's meaning is clear from the context, it's common to use abbreviations like ` i` for `index` or `max` for `maximum` to keep code concise and easy to read.

### MixedCaps

The convention in Go is to use `MixedCaps` or `mixedCaps` rather than underscores to write multiword names.

### Package Name

Good package names make code better. A package’s name provides context for its contents, making it easier for the developer or user to understand what the package is for and how to use it. The name also helps package maintainers determine what does and does not belong in the package as it evolves. Well-named packages make it easier to find the code you need.

#### Package Name Guideline

To make a Go package easy to use, it's best to give it a short, clear, and meaningful single-word name. Go packages typically have lowercase names without `under_scores` or `mixed capital` letters. These names are often simple nouns, like:

- time (provides functionality for measuring and displaying time)
- list (implements a doubly linked list)
- http (provides HTTP client and server implementations)

Below are example for bad naming styles in Go:

- computeServiceClient
- priority_queue

**_Abbreviate judiciously_**. Package names may be abbreviated when the abbreviation is familiar to the programmer. Widely-used packages often have compressed names:

- strconv (string conversion)
- syscall (system call)
- fmt (formatted I/O)

> Note:- If abbreviating a package name makes it ambiguous or unclear, don’t do it.

Another convention is that the package name is the base name of its source directory; the package in `src/encoding/base64` is imported as `"encoding/base64"` but has name `base64`, not `encoding_base64` and not `encodingBase64`.

Another short example is `once.Do`; `once.Do(setup)` reads well and would not be improved by writing `once.DoOrWaitUntilDone(setup)`. _Long names don't automatically make things more readable._ A helpful doc comment can often be more valuable than an extra long name.

### Interface Names

By convention, one-method interfaces are named by the `method name` plus and `-er` suffix or similar modification to construct an agent noun; Reader, Writer, Formatter, CloseNotifier etc.

## Variable Declaration

In Go, a `variable` is a piece of storage containing a value. You can give a variable a name by using a `variable declaration`. Just use the `var` keyword followed by the desired name and the type of values the variable will hold.

Variable declaration syntax:

`var name string`

- `var` :- It is a keyword.
- `name` :- It will be a variable name that you want to access in your program.
- `string` :- It will be any datatype that the variable will hold data for. (Go-supported datatypes)

Once you declare a variable, you can assign any value of that type to it with `=` sign.

`var name string = "Jerry"`

You can assign values to multiple variables in the same statement. Just place multiple variable names on the left side of `=`, and the same number of values on the right side, separated with commas (`,`).

Syntax for assigning multiple variables at once:

`var length, width float64 = 1.2, 2.4`

You can assign new values to existing variables, but they need to be values of the same type, like when you assign `int` variable value to `string` type variable. Go’s static typing ensures you don’t accidentally assign the wrong kind of value to a variable.

## Short Variable Declaration

As we saw in the above section, we can declare variables and assign them values on the same line. But if you know what the initial value of a variable is going to be as soon as you declare it, it’s more typical to use a `short variable declaration`. Instead of explicitly declaring the type of the variable and later assigning it with `=`, you do both at once using `:=`.

Here are our previous examples with short variable declarations :

1. `name := jerry` instead of `var name string = "Jerry"`
2. `length, width := 1.2, 2.4` instead of `var length, width float64 = 1.2, 2.4`

There’s no need to explicitly declare the variable’s type; the type of the value assigned to the variable becomes the type of that variable.

Because short variable declarations are so convenient and concise, they’re used more often than regular declarations. You’ll still see both forms occasionally, though, so it’s important to be familiar with both.

## What next!!!

In my next blog, I will try to cover functions and all Go datatypes with examples.

In this blog, if I have made any mistakes, please correct me in the below comment section. From this, we can all learn.

## References

- [Head First GO](https://www.oreilly.com/library/view/head-first-go/9781491969540/) - Jay McGavren
- [Effective Go](https://go.dev/doc/effective_go) - Go Doc
- [Clean Code](https://www.oreilly.com/library/view/clean-code-a/9780136083238/) - Robert C. Martin
