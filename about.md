---
layout: page
title: About
permalink: /about/
---

FNA is a reimplementation of the <a href="http://en.wikipedia.org/wiki/Microsoft_XNA">Microsoft XNA Game Studio 4.0 Refresh</a> libraries.

FNA is primarily developed by video game porter <a href="http://www.flibitijibibo.com/">Ethan Lee</a>, who has shipped more than a dozen ports of XNA games using the exact branch that you see on GitHub today!

You can see some examples of games using FNA on the left side of this page.

Our goal is to preserve the XNA game library by reimplementing XNA itself, with an incredible focus on accuracy. We want to reproduce XNA as it was made my Microsoft, while providing an experience that feels "at home" on all of our target platforms. We don't use game-specific hacks in our code; either we do it right or we don't do it at all.

Because our platform focus is exclusively on fully open platforms, our primary focus is on the desktop. We support Windows, Mac OS X, and GNU/Linux with a single assembly file. We don't use preprocessor conditionals for platforms; our platform model requires that we build a library that works on any platform, regardless of where it was built. When you build an FNA title with Visual Studio, you can expect it to function on Windows, Mac, and Linux with that one set of output assemblies.

We also strictly use Free Open Source Software in FNA. The FNA project will not act as a gateway into proprietary products; you should be able to freely do what you wish with our software and the software that we use to provide what we believe is an incredibly important project in preserving XNA and the games that were built with them. While it is certainly possible to use FNA to target closed platforms and technologies, we do not want to impose those restrictions on our development process (and consequently, your development process!).

For more information, see the navigation bar at the top of this page.
