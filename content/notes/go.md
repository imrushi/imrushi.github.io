---
title: "Go"
date: 2023-08-24
draft: false
toc: true
author: "Rushi"
tags: ["golang", "notes"]
keywords:
  [
    "programming",
    "go",
    "go notes",
    "technincal",
    "golang",
    "golang notes",
    "golang basics",
  ]
categories: ["Go"]
enableGitInfo: true
showLastUpdated: true
---

---

Go is a programming language that focuses on simplicity and speed. It's simpler than other langauges, so it's quicker to learn. And it lets you harness the power of today's multicore computer processor, so your programs run faster.

## History of Go

Back in 2007, the serach engine Google had a problem. They had to maintain programs with millions of line of code. Before they could test new changes, they had to compile the code into runnable form, a process which at the time took the better part of an hour. Needless to say, this was bad for developer productivity.

So Google engineers **Robert Griesemer, Rob Pike, and Ken Thompson** sketeched out some goals for a new language:

- Fast Compilation
- Less cumbersome code
- Unused memory freed automatically (garbage collection)
- Easy-to-write software that does serveal operations simultaneously (concurrency)
- Good support for processor with multiple cores

After a couple years of work, Google had created Go: a lanaguage that was fast to write code for and produced programs that were fast to compile and run. The project switched to an open source license in 2009. It's now free for anyone to use.

If you're writing a command-line tool, Go can produce executeable files for Windows, MacOS, and Linux, all from the same source code. If you're writing a web server, it can help you handle many users connecting at once. And no matter what you're what you're writing, it will help you ensure that your code is easir to maintain.

## Syntax Basics

### Go Playground

The easiest way to try Go is to visit [Go Playground](https://go.dev/play) in your web browser. It is simple editor where you can enter Go code and run it on their servers. The result is displayed right there in your browser.

> Note: Go Playground requires stable internet connection. If you don't, see [Intall Go](https://go.dev/doc/install) on your system.

Let's try out play ground:

1. Open [Go Playground](https://go.dev/play) in your browser.
2. There will be hello world program already written.
3. Click the Format button, which will automatically reformat your code according to Go conventions.
4. Click the Run button.

You should see "Hello, World!" displayed at the bottom of the screen.

Congratulations, you've just run your first Go program🥳!

### Go file layout

Now let's look at the code and figure out what it actually means...

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
3. The actual code

- `Package` : A package is a collection of code that all does similar things, like fomatting strings or drawing images. The package clause gives the name of the package that this file's code will become a part of. In this case, we use the special package `main`, which is required if this code is going to be run directly (usually from the terminal).
- `import` : Go files almost always have one or more `import` statements. Each file needs to `import` other packages before its code can use the code those other packages contain. Loading all the Go code on your computer at once would result in a big, slow program, so instead you specify only the package you need by importing them.
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

### No Semicolons

As you can see in our program ther are no semicolons to seperate statements in Go, we can use semicolons but it's not required (in fact, it's generally frowned upon).

Like [C](<https://en.wikipedia.org/wiki/C_(programming_language)>), Go's formal grammer uses semicolons to terminate statements, but unlike in [C](<https://en.wikipedia.org/wiki/C_(programming_language)>), those semicolons do not appear in the source. Instead the [lexer](https://en.wikipedia.org/wiki/Lexical_analysis) uses a simple rule to insert semicolons automatically as it scans, so the input text is mostly free of them.

If you want to know more how it works you check Go's official doc
https://go.dev/doc/effective_go#semicolons

### Formatting

Formatting issues are the most contentious but the least important. People may prefer different formatting styles, thus when another developer or person reads the same code it may take some time for him to grasp if he is not accustomed to the same formatting style. It will be easier if everyone formats their documents in the same way.

With Go we take an unusual approch and let the machine take care of most formatting issues. The Go compiler comes with a standard formatting tool, called `go fmt`. The `go fmt` program reads a Go program and emits the source in a **_standerd style of indentation and vertical alignment, retaining and if necessary reformatting comments._**

Next time whenever you share your code, other Go developers will expect it to be in the standard Go format. _With Go all you have to do is run `go fmt`_.

If you want to try its simple version, head over to the [Go playground](https://go.dev/play), write some buggy or unformatted code, and hit the `format` button.

### Comments

Go provides C style `/* */` block comments and C++ style `//` line comments. Most block comments appear as package comments but are useful within an expression or to disable large blocks of code; Otherwise usually line comments are used.

Comments that appear before a top-level declaration, with no intervening newlines, are considered to document the declaration itself. For example: In the above `Hello World` programme with comments, all comments will be used in `Go Documents`. These `doc comments` are the primary documentation for given Go package or command.

For more about doc comments, see [Go Doc Comments](https://go.dev/doc/comment).

### Functions

### Data Types
