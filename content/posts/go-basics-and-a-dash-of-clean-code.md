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

As you can see in our program, there are no semicolons to separate statements in Go; we can use semicolons, but it’s not required (in fact, it’s generally frowned upon). This design choice was made to enhance code readability and reduce the potential for common programming errors.

Like [C](<https://en.wikipedia.org/wiki/C_(programming_language)>), Go's formal grammer uses semicolons to terminate statements, but unlike in [C](<https://en.wikipedia.org/wiki/C_(programming_language)>), those semicolons do not appear in the source. Instead the [lexer](https://en.wikipedia.org/wiki/Lexical_analysis) uses a simple rule to insert semicolons automatically as it scans, so the input text is mostly free of them.

### How does it know when to add semicolons?

The rule is this. If a line ends with an identidier (like words such as `int` or `float64`), a basic value such as a number or a string, or certain specific tokens like

`break continue fallthrough return ++ -- ) }`

then the Go lexer adds a semicolon after that token when it encounters a newline.

To put it simply, when there's a chance that a newline could end a statement, Go automatically inserts a semicolon.

One consequence of the semicolon insertion rules is that you cannot put the opening brace of a control structure like `if`, `for`, `switch` or `select` on the new line. If you do, a semicolon will inserted before the brace, which could cause unwanted effects. So write them like below:

<!-- prettier-ignore-start -->
{{< code language="go" title="if statement" expand="Show" collapse="Hide" isCollapsed="false" >}}
if i < f() {
    g()
}
{{< /code >}}
<!-- prettier-ignore-end -->

not like this

<!-- prettier-ignore-start -->
{{< code language="go" title="bad if statement" expand="Show" collapse="Hide" isCollapsed="false" >}}
if i < f()  // wrong!
{           // wrong!
    g()
}
{{< /code >}}
<!-- prettier-ignore-end -->
