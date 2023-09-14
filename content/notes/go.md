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
    "technical",
    "golang",
    "golang notes",
    "golang basics",
    "golang syntax",
  ]
categories: ["Go"]
enableGitInfo: true
showLastUpdated: true
---

---

Go is a programming language that focuses on simplicity and speed. It's simpler than other languages, so it's quicker to learn. And it lets you harness the power of today's multicore computer processor, so your programs run faster.

## History of Go

Back in 2007, the search engine Google had a problem. They had to maintain programs with millions of line of code. Before they could test new changes, they had to compile the code into runnable form, a process which at the time took the better part of an hour. Needless to say, this was bad for developer productivity.

So Google engineers **Robert Griesemer, Rob Pike, and Ken Thompson** sketched out some goals for a new language:

- Fast Compilation
- Less cumbersome code
- Unused memory freed automatically (garbage collection)
- Easy-to-write software that does serval operations simultaneously (concurrency)
- Good support for processor with multiple cores

After a couple years of work, Google had created Go: a language that was fast to write code for and produced programs that were fast to compile and run. The project switched to an open source license in 2009. It's now free for anyone to use.

If you're writing a command-line tool, Go can produce executable files for Windows, MacOS, and Linux, all from the same source code. If you're writing a web server, it can help you handle many users connecting at once. And no matter what you're what you're writing, it will help you ensure that your code is easier to maintain.

## Syntax Basics

### Go Playground

The easiest way to try Go is to visit [Go Playground](https://go.dev/play) in your web browser. It is simple editor where you can enter Go code and run it on their servers. The result is displayed right there in your browser.

> Note: Go Playground requires stable internet connection. If you don't, see [Install Go](https://go.dev/doc/install) on your system.

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

- `Package` : A package is a collection of code that all does similar things, like formatting strings or drawing images. The package clause gives the name of the package that this file's code will become a part of. In this case, we use the special package `main`, which is required if this code is going to be run directly (usually from the terminal).
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
    // This line displays ("print") "Hello, World" in
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

As you can see in our program there are no semicolons to separate statements in Go, we can use semicolons but it's not required (in fact, it's generally frowned upon).

Like [C](<https://en.wikipedia.org/wiki/C_(programming_language)>), Go's formal grammar uses semicolons to terminate statements, but unlike in [C](<https://en.wikipedia.org/wiki/C_(programming_language)>), those semicolons do not appear in the source. Instead the [lexer](https://en.wikipedia.org/wiki/Lexical_analysis) uses a simple rule to insert semicolons automatically as it scans, so the input text is mostly free of them.

If you want to know more how it works you check Go's official doc
https://go.dev/doc/effective_go#semicolons

### Formatting

Formatting issues are the most contentious but the least important. People may prefer different formatting styles, thus when another developer or person reads the same code it may take some time for him to grasp if he is not accustomed to the same formatting style. It will be easier if everyone formats their documents in the same way.

With Go we take an unusual approach and let the machine take care of most formatting issues. The Go compiler comes with a standard formatting tool, called `go fmt`. The `go fmt` program reads a Go program and emits the source in a **_standard style of indentation and vertical alignment, retaining and if necessary reformatting comments._**

Next time whenever you share your code, other Go developers will expect it to be in the standard Go format. _With Go all you have to do is run `go fmt`_.

If you want to try its simple version, head over to the [Go playground](https://go.dev/play), write some buggy or unformatted code, and hit the `format` button.

### Comments

Go provides C style `/* */` block comments and C++ style `//` line comments. Most block comments appear as package comments but are useful within an expression or to disable large blocks of code; Otherwise usually line comments are used.

Comments that appear before a top-level declaration, with no intervening newlines, are considered to document the declaration itself. For example: In the above `Hello World` programme with comments, all comments will be used in `Go Documents`. These `doc comments` are the primary documentation for given Go package or command.

For more about doc comments, see [Go Doc Comments](https://go.dev/doc/comment).

### Names

Names are as important in Go as in any other language. Go has one simple set of rules that apply to the names of variables, functions, and types:

- A name must begin with letter, and can have any number of additional letters and numbers.
- The visibility of a name outside a package is determined by below points:

  - If the name of a variable, function, or type begins with a **_Capital letter_**, it is considered **_Exported_** and can be accessed from packages outside the current one. `Example` - As you have seen in above [hello world program](#go-file-layout). The `P` in `fmt.Println` is capitalized: so it can be used from the main package or any other.
  - If the name begins with a **_Lowercase letter_**, it is considered **_Unexported_** and only be accessed within the current package.

Above the only rules enforced by the language. But the `Go community` follows some additional conventions as well:

- If a name consists of multiple words, each word after the first should be capitalized, and they should be attached together without spaces between them, like this: **_topRank, RetryConnection_**... This style is often called [Camel Case](https://en.wikipedia.org/wiki/Camel_case) because the capitalized letter look like the humps of a camel.

- When the meaning of a name is obvious from the context, the Go community's convention is to abbreviate it: to use `i` instead of `index`, `max` instead of `maximum`...

#### MixedCaps

The convention in Go is to use `MixedCaps` or `mixedCaps` rather than underscores to write multiword names.

#### Package Names

Good pacakage names make code better. A package's names provides context for its contents, making it easier for developer/user to understand what the package is for and how to use it. The name also helps package maintainers determine what does and does not belong in the package as it evolves. Well-named packages make it easier to find the code you need.

##### Guideline

It's helpful if everyone using the package can the same name to refer to its contents, which implies that the package name should be good: short, concise, evocative. By convention, packages are given lower case, single-word names; there should be no need for **_under_scores_** or **_mixedCaps_**. They are often simple nouns, such as:

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

#### Interface Names

By convention, one-method interfaces are named by the `method name` plus and `-er` suffix or similar modification to construct an agent noun; Reader, Writer, Formatter, CloseNotifier etc.

### Declaration Variables

In Go, a `variable` is a piece of storage containing a value. You can give a variable a name by using a `variable declaration`. Just use the `var` keyword followed by the desired name and the type of values the variable will hold.

Variable declaration syntax:

`var name string`

- `var` :- It is a keyword.
- `name` :- It will be a variable name that you want to access in your programme.
- `string` :- It will be any datatype that the variable will hold data for. (Go-supported datatype)

Once you declare a variable, you can assign any value of that type to it with `=` sign.

`var name string = "Jerry"`

You can assign values to multiple variables in the same statement. Just place multiple variable names on the left side of `=`, and the same number of values on the right side, separated with commas (`,`).

Syntax for assign multiple variables at once:

`var length, width float64 = 1.2, 2.4`

You can assign new values to existing variables, but they need to be values of the same type like you can't assign `int` variable value to `string` type variable. Go’s static typing ensures you don’t accidentally assign the wrong kind of value to a variable.

### Short Variable Declaration

As we seen in the above section we can declare variables and assign them values on the same line. But if you know what the initial value of a variable is going to be as soon as you declare it, it’s more typical to use a `short variable declaration`. Instead of explicitly declaring the type of the variable and later assigning to it with `=`, you do both at once using `:=`.

Here are our previous examples with short variable declaration :

1. `name := jerry` instead of `var name string = "Jerry"`
2. `length, width := 1.2, 2.4` instead of `var length, width float64 = 1.2, 2.4`

There’s no need to explicitly declare the variable’s type; the type of the value assigned to the variable becomes the type of that variable.

Because short variable declarations are so convenient and concise, they’re used more often than regular declarations. You’ll still see both forms occasionally, though, so it’s important to be familiar with both.

### Functions

A function is a group of statements that together perform a task. Function can be used to:

- Reuse code in multiple places.
- Make code more organized and readable.
- Hide implementation details.
- Improve code performance.

Functions are declared using the `func` keyword, followed by the `function name, a list of parameters, and a block of code`. The function body is enclosed in curly `braces` (`{` and `}`). A function can take zero or more arguments.

Syntax for function in Go: `func funcName(var1 dataType, var2 dataType,... varN dataType) returnType {}`

#### Creating Function and Calling Function

Let's create a sample addition program which will contains function with name `add()` it will take 2 arguments `x and y`. Which will be `int` type and return `int` (Don't worry we will check return and data types next sections.).

<!-- prettier-ignore-start -->
{{< code language="go" title="Addition Function" expand="Show" collapse="Hide" isCollapsed="false" >}}
package main

import "fmt"

func add(x, y int) int {
  return x + y
}

func main() {
    fmt.Println(add(15, 10))
}
{{< /code >}}
<!-- prettier-ignore-end -->

In the above `Addition Function` program we have two functions. The first is `main()`, which doesn't take any arguments (arguments are passed inside rounded brackets `()`). The second function is our `add` function, which you can see we have started with the `func` keyword to declare a function, followed by the function name `add()`, and we have passed two arguments `x` and `y`, which are type of `int`. When two or more consecutively named function parameters or arguments share a type, you can omit the type from all but the last.

In the above example, we shortened:

`x int, y int` to `x, y int`

The function is returning `int` data type, which is single value, with `return statement` statement of `x + y`, which is an addition of numbers.

To call this function, we need to type the function name (`add` in this case) and a pair of parentheses with arguments separated by a comma (,) in our case, which is `15, 10`.

If you check the above program `Println` is also a function. Let's break down the structure of `fmt.Println()` and see what is happening here.

- `fmt.` :- It is an package which contain multiple function.
- `Println` :- `Println` is function name which resides in `fmt` package. To use `Println` package should be imported then only we can access function it offers.
- `()` :- By using parentheses we are executing the function.

If the function takes a number of arguments and we don’t pass any or provide too few or too many, it will give you an error message saying how many arguments were expected, and you will need to fix your code.

#### Multiple Return Value

One of Go's unusual features is that functions and methods can return multiple values. This feature is quite useful in various situations where you need to return more than one piece of information from a function. Multiple return values allow you to efficiently handle errors, return status code, or return additional context information along with the primary result.

Below is Division program which return multiple values like quotient, remainder :

<!-- prettier-ignore-start -->
{{< code language="go" title="Division" expand="Show" collapse="Hide" isCollapsed="false" >}}
package main

import (
	"fmt"
)

func divideAndRemainder(dividend, divisor int) (int, int) {
	quotient := dividend / divisor
	remainder := dividend % divisor
	return quotient, remainder
}

func main() {
	quotient, remainder := divideAndRemainder(10, 3)
	fmt.Printf("Quotient: %d, Remainder: %d\n", quotient, remainder)
}

{{< /code >}}
<!-- prettier-ignore-end -->

In the above example, the `divideAndRemainder` function takes two integer parameters, `dividend` and `divisor`. It calculates the quotient and remainder of the division operation and returns both values as tuple (or pair) of integers. In Go, you specify the return types in parentheses immediately after the function signature. In below declaration `(int, int)` is returning pair of integers in function return value.

`func divideAndRemainder(dividend, divisor int) (int, int) {}`

When you call the `divideAndRemainder` function in the `main` function, you can capture both return values `(quotient and remainder)` and use them as needed.

#### Named Result Parameters

Named Result Parameters allow us to declare names from the return values of a function in it's signature. Named result parameters are particularly useful for improving the readability and documentation of a code. They make it clear what each return value represents and can be especially helpful in functions with multiple return values.

<!-- prettier-ignore-start -->
{{< code language="go" title="Division with Named Result Parameters" expand="Show" collapse="Hide" isCollapsed="false" >}}
package main

import "fmt"

func divideAndRemainder(dividend, divisor int) (quotient int, remainder int) {
	quotient = dividend / divisor
	remainder = dividend % divisor
	return
}

func main() {
	q, r := divideAndRemainder(10, 3)
	fmt.Printf("Quotient: %d, Remainder: %d\n", q, r)
}

{{< /code >}}
<!-- prettier-ignore-end -->

In this example, the `divideAndRemainder` function has named result parameters `quotient` and `remainder` (`(quotient int, remainder int)`). Inside the function body, you assign values to these variables, and you don't need to use the `return` statement explicitly. Go will automatically return the values of `quotient` and `remainder` when the function exits.

Benefits of using named result parameters:

1. `**_Documentation and clarity_**`: It provide self-documentation for the function, making it clear what each return value represents. This can improve code readability and maintainability.
2. `**_Simplify return statement_**`: You don't need to explicitly list the `return` values in the return statement. This simplifies the code and reduces redundancy.
3. `**_Avoid variable shadowing_**`: When you use named result parameters, you can avoid variable shadowing issues that may occur if you redeclare the same variable names in a nested block.
4. `**_Facilitate readability in complex function _**`: In functions with many return values or complex logic, using named result parameters can make it easier to understand the meaning of each return value.

> `Note`:- Named result parameters are implicitly declared as local variables within the function. You can assign values to them directly, and they will be returned when the function exits. However,you cannot use the `:=` short declaration operator to declare and assign values to named result parameters withing the same line; you should use the `=` assignment operator.

#### Defer

In Go, the `defer` statement is used to schedule a function call to be executed just before the surrounding function returns. It allows you to ensure that certain cleanup or finalization tasks are performed regardless of how the function exits, whether it's due to normal execution or an error.

How `defer` statement works in Go:

1. `**_Deferred functions are executed in reverse order_**`: When you use `defer` to schedule a function call, Go adds it to a stack. The deferred functions are executed in reverse order, meaning the last scheduled function will be executed first, and so on. This behavior is useful when you need to reverse some action or cleanup resources.
2. `**_Deferred functions capture their arguments at the time of the defer statement_**`: If you pass arguments to a deferred function, those arguments are evaluated immediately, and their values are captured at the time of the `defer` statement, not at the time the function is executed. This can lead to some interesting behavior in cases where the values of variables change before the function executes.

A simple example to illustrate how `defer` works:

<!-- prettier-ignore-start -->
{{< code language="go" title="Defer working" expand="Show" collapse="Hide" isCollapsed="false" >}}
package main

import (
	"fmt"
)

func main() {
	defer fmt.Println("This will be executed last")
	defer fmt.Println("This will be executed second")
	fmt.Println("This will be executed first")
}

{{< /code >}}
<!-- prettier-ignore-end -->

In this example, when the `main` function is executed, it first prints "This will be executed first," then schedules the two `fmt.Println` functions using `defer`. These deferred functions will be executed in reverse order when the `main` function is about to return.

In practice, you often use `defer` for resource cleanup, like closing files, releasing locks, or other cleanup tasks, to ensure that these tasks are performed even if there's an early return or an error condition.

### Methods

### Data Types

### Conditionals and Loops
