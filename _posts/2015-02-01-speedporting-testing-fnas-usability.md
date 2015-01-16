---
layout:     post
title:      "Speedporting: Testing FNA's Usability"
date:       2015-02-01
published:  false
author:     Ethan "flibitijibibo" Lee
---

You'll notice when looking at this site, the FNA wiki, and anywhere else that FNA is discussed that preservation and accuracy are a really big deal for this project. Most of FNA's development has had an incredible amount of focus on reimplementing the framework the "right" way the first time, with an additional focus on implementing it in a way where new platforms and graphics/audio backends are trivial to add without having to pull apart the "XNA" portion of FNA. These are essential for an XNA preservation project, and I will probably discuss them in more detail in later articles.

But these are somewhat specific concerns for FNA (aside from perhaps portability). This doesn't excuse us from having to worry about things that all software projects should be concerned with; the most important is usability. Simply put: it doesn't matter how well we do our job if the actual act of hooking it up to XNA games is not a good enough experience for the developer to ever put any of it to use.

We're admittedly in a unique position where usability doesn't necessarily involve the API, because we're just using the <a href="http://msdn.microsoft.com/en-us/library/bb203940.aspx">XNA 4.0 Refresh API as documented by Microsoft</a>, with <a href="https://github.com/flibitijibibo/FNA/wiki/5:-FNA-Extensions">very few exceptions</a>, but that's only one aspect of using a library in software development. Even then, no matter how good/bad the API is, it doesn't matter if simply including it in your project is an agonizing process. Project file maintenance isn't programming, it's busy work, and nobody likes working on them (even build engineers, I suspect). Additionally, if distributing the software becomes arduous, you risk becoming a reason for developers not shipping as often as they could because they simply won't want to do the work of building and packaging their games, and that can have an adverse effect on the quality of the products customers are buying. This is not an acceptable standard for software developers to hold themselves to, and as developers of software that is expected to ship to a large amount of people (many of which are paying customers), we need to take responsibility in making FNA a good developer experience, in addition to a good user experience (the latter being another subject for another article).

Much like a cliche film plot, we're going to start with the ending of today's story. Here is ~~~FIXME~~~ being ported to Linux in less than 90 seconds, blindly, using only the game source and a copy of the Windows version's Content folder as it ships on Steam:

FIXME: Embed a thing in the thing

This seems a little crazy, but be assured that getting to this point in terms of usability was not easy - it took nearly 2 years of dedicated development on my part to get FNA in this state. What happened during those two years?

When developing FNA, there were three major steps in the typical port process that I considered to be top priorities for the 1.0 release:

1. **One Assembly, All Platforms**
2. **One Library, One Project**
3. **One Game, One Content Folder**

### In The Beginning...

Back in January 2013, FNA began as a branch of MonoGame that would be shipping in the Linux/Mac versions of <a href="http://store.steampowered.com/app/95300/">Capsized</a>, as part of a <a href="http://www.humblebundle.com/">Humble Indie Bundle</a>. The dependency tree for each platform looked something like this:

- Linux:
	- OpenTK
		- X11 window/input management
		- OpenAL bindings for audio support
			- OpenAL Soft
		- System.Drawing.Imaging for window icon support
			- libgdiplus, GDI+ implementation for *nix
				- Oh god you really don't want to know
	- Tao.Sdl
		- SDL 1.2 - Joystick support
		- SDL_mixer - Song support
			- libvorbisfile, libvorbis, libogg
	- Lidgren.Network
		- You know, for that network support you're not using
- OS X:
	- MonoMac
		- MonoMac Window/Input management libraries
		- MonoMac.OpenAL for audio support
			- OS X includes OpenAL by default!
		- Requires Xamarin.Mac and OS X to build
			- Requires special NSApplication Main() entry point
			- Use of P/Invoke requires a license!
			- $300/year for "indie" license with no support
			- $999/year for full license and support
	- Tao.Sdl
		- SDL 1.2 - Joystick support
	- Lidgren.Network
		- You know, for that network support you're not using

It was a little unwieldy to work with (particularly MonoMac and the separate solution files), so naturally I whittled it down to this by the time we had a late beta of Capsized rolling:

- Linux:
	- OpenTK
		- X11 window/input management
		- OpenAL bindings for audio support
			- OpenAL Soft
		- System.Drawing.Imaging for window icon support
			- libgdiplus, GDI+ implementation for *nix
				- Seriously you really don't want to know
	- Tao.Sdl
		- SDL 1.2 - Joystick support
		- SDL_mixer - Song support
			- libvorbisfile, libvorbis, libogg
	- TheoraPlay# - VideoPlayer support
		- libtheoraplay, libtheora, libvorbis, libogg
	- Lidgren.Network
		- You know, for that network support you're not using
- OS X:
	- MonoMac
		- MonoMac Window/Input management libraries
		- MonoMac.OpenAL for audio support
			- OS X includes OpenAL by default!
		- Requires Xamarin.Mac to build
			- Requires special NSApplication Main() entry point
			- Use of P/Invoke requires a license!
			- $300/year for "indie" license with no support
			- $999/year for full license and support
	- Tao.Sdl
		- SDL 1.2 - Joystick support
		- SDL_mixer - Song support
			- libvorbisfile, libvorbis, libogg
	- TheoraPlay# - VideoPlayer support
		- libtheoraplay, libtheora, libvorbis, libogg
	- Lidgren.Network
		- You know, for that network support you're not using

Er, wait... that's not how whittling down works. Whoops.

You would think that I would have gone and trimmed things down a bit, but to be honest we had the game "mostly" working despite the work it took to port to MonoGame on Linux, and then port again to MonoGame on OS X. These ports took 3 months to do, but once it worked, it worked... right?

### Fix #1: Fixing Portability

Compounded by things like OpenTK simply not working for reasons that would take a whole separate article to even begin to describe, and Xamarin adding DRM to MonoDevelop so you couldn't even *build* without shelling out $300 (<a href="http://www.flibitijibibo.com/images/monodrm/1.png">1</a> <a href="http://www.flibitijibibo.com/images/monodrm/2.png">2</a> <a href="http://www.flibitijibibo.com/images/monodrm/3.png">3</a>), I was then offered <a href="http://store.steampowered.com/app/216290/">Gateways</a>, where I would have then needed to go through this whole process again.

On April 3, 2013, I started <a href="https://github.com/flibitijibibo/SDL2-CS">SDL2#</a> with fellow Linux developer <a href="http://davidgow.net/">David Gow</a>. By the end of April, we had both Capsized *and* Gateways running on a brand new platform backend of MonoGame known as MonoGame-SDL2 (and a week after that, I merged it into the MonoGame branch used for <a href="http://store.steampowered.com/app/224760">FEZ</a>, and had the game running natively on Linux without access to the FEZ source!). I still remember the first report that I got from David once we switched the Capsized beta over to MG-SDL2:

>This is so much better than the OpenTK version it's not funny. Seriously: HIB8 should have the SDL2 version in it, and OpenTK should die a fiery death.

On top of the stability improvements, this was the new dependency tree:

- MonoGame-SDL2:
	- SDL2#
		- SDL2 - Window/Input/Controller/Rumble support
		- SDL2_mixer - Song support
			- libvorbisfile, libvorbis, libogg
		- OpenAL bindings for audio support
			- OpenAL Soft
	- TheoraPlay# - VideoPlayer support
		- libtheoraplay, libtheora, libvorbis, libogg
	- Lidgren.Network
		- You know, for that network support you're not using

Ah, that's much better! I'm sure you notice that there's only one platform now - this is the most important part of these changes, by far.

Here's the thing about C# binaries: To be blunt, it's not *real* code. It's just bytecode that gets interpreted by a CLR, which JIT compiles it into native code to be run on the machine. That CLR isn't restricted to any specific platform; the virtual machine interpreting this bytecode can be on any operating system, on any architecture. In short: There is absolutely no reason I can possibly think of as to why managed code should ever *ever* be dependent on a platform, *much* less a specific architecture. Again, it's *not real code*; at least for native code there's a legitimate reason to recompile on every platform and architecture. C# code? No. If there's tech out there for managed languages that restricts you in this way, that author is fired.

When using libraries designed for the purposes of making code portable, such as SDL2, that allows projects to be code-compatible with various platforms. For FNA, we set out to make projects *binary-compatible* with various platforms. In FNA, there are exactly 0 platform defs in the entire source tree. What we have instead are a small handful of one-time platform checks at runtime, to determine things like the StorageDevice folder location, OS X Spaces support, etc. These are things you can do in managed languages - unlike native code, where it makes sense to determine platform at build time, we can check for this at runtime, and run the same output binaries on any platform we like. Adding new platforms is just as trivial as it would have been if we did platform defs; if someone wants to officially support FreeBSD in FNA, for example, they simply check for that platform in the locations where we do platform checks. It's no different from #ifdef checks, and the benefit is *tremendous*. You are of course left to ensure that the user experience is good on every OS, but having this as a starting point for ports is a really big deal.

In particular, this makes deployment incredibly simple. You can, as a Windows developer, build an FNA title in the environment you're accustomed to, and then copy those binaries over to a MonoKickstart environment on Linux or OS X, and you can actually expect your game to run with the very same binaries you were running on your Windows machine. With the largely non-moving MonoKickstart environment and native libraries, packaging/updating can be as simple as just copying the executable over to the game folder and uploading immediately. When doing Steam uploads, you can build and upload for 3 platforms without ever leaving your development OS once. What can sometimes be a >15-minute task just became a 2-minute task at worst.

### To Critical Non-acclaim

This was definitely an improvement, but it was still pretty unwieldy - the dependencies used to just be binary C# DLLs that the MonoGame projects would include (except for Lidgren), but since I wrote both SDL2# and TheoraPlay#, we were using the full C# projects for those. Combined with the Lidgren project, this meant that MG-SDL2 had *4 projects in total*, which is pretty nuts. But hey, I was the developer, so who cares. It was still better than what was there before...

Over the course of the next year, MG-SDL2 started getting a lot of attention, both from myself and from other developers who were wanting to port their XNA games. It was enough that I was confident in making FNA its own thing, but not enough to see how hard it was to use... I actually did eventually remove the Lidgren dependency, but that's only because I split the GamerServices/Net namespaces into their own assembly, for both optimization and because <a href="http://store.steampowered.com/app/228960/">Skulls of the Shogun</a> had its own implementation, so splitting it up was easier for me anyway.

And that's the source of all the usability improvements up to this point - it's really just improvement for my own convenience. Sure, it still wasn't too great to set up, but once it was set up, that was it!

### Speedporting, or: The Only Thing Here You Care About

Mysteriously, despite shipping 15 ports over the course of a single year, the number of ports by other developers was still pretty minimal. I was able to get games running natively in mere hours, yet I would see much longer timelines from other developers who went on to ship with our tech. Additionally, developers were terrified of updating FNA for seemingly no reason at all, even when later versions had long since fixed problems they were reporting months after it had been fixed. Something was clearly wrong.

Having been inspired by the <a href="https://gamesdonequick.com/">Games Done Quick</a> events, and speedrunning in general, I decided to do something similar. I started looking around for open source XNA games, and port them to Linux as fast as I possibly could. If I could port full commercial titles in mere hours, how hard could it be?

My personal best time as of July 2014 was 2 minutes and 45 seconds. The port looked like this:

<div style="text-align:center"><iframe width="420" height="315" src="//www.youtube.com/embed/qIWDk1NuXIY" frameborder="0" allowfullscreen></iframe></div>

2 minutes and 45 seconds sounds like a pretty good time, but look at the video and you will quickly notice just how sloppy the actual process is. In fact, I even make several *major* mistakes just setting the project up! I don't even start compiling until nearly 2 minutes into the port. Which is insane.

### Fix #2: Fixing Project Setup

After a somewhat messy debacle with regard to the MonoGame trademark, I finally renamed the MonoGame.Framework.dll to FNA.dll, and during this process, I also decided to sit down and fix the project setup issue. One all-nighter later, this was the new dependency tree...

- FNA
	- SDL2#
		- SDL2 - Window/Input/Controller/Rumble support
		- SDL2_mixer - Song support
			- libvorbisfile, libvorbis, libogg
	- OpenAL# - Audio support
		- OpenAL Soft
	- TheoraPlay# - VideoPlayer support
		- libtheoraplay, libtheora, libvorbis, libogg

... and this is our planned dependency tree for FNA 1.0:

- FNA
	- SDL2# - Window/Input/Controller/Rumble support
		- SDL2
	- OpenAL# - Audio support
		- OpenAL Soft
	- MojoShader# - D3D Effect support
		- MojoShader
	- Vorbisfile# - Song support
		- libvorbisfile, libvorbis, libogg
	- TheoraPlay# - VideoPlayer support
		- libtheoraplay, libtheora, libvorbis, libogg

This looks like a step back in usability, but there's one major difference in how we use these libraries: all of these libraries are now statically linked into FNA. While each project can still stand on its own, we now just include the individual source files into FNA.dll, leaving us with one project and a single output assembly for FNA. This *dramatically* improved the setup time, and thus removed a very wide window of opportunity for silly mistakes that could happen during a speedport.

### Fix #3: Fixing Content Compatibility

Despite the improvements made to the project files, there were still some major issues making speedports difficult. Like I said in the beginning: project file management's not programming, it's just janitorial nonsense. There were still concerns with FNA's support for specific kinds of XNA content files; this isn't entirely surprising since XNA content is one of the biggest draws to the framework, and there are lots of formats you have to be concerned with - personally, most of my time reverse engineering has been for the XACT binaries, and even today it still gets a lot of attention from me (though XACT isn't strictly an XNA format... there may be demand for splitting the FNA XACT runtime into its own native C/C++ library in the future, but that's a whole different topic). However, the worst one by far was XNA Effect shaders.

Until recently there wasn't a good solution to this problem. Very early versions of MonoGame just used GLSL and fudged some things here and there, expecting you to rewrite the shaders as needed and make them work like effects might have in XNA. More recent versions of MonoGame use the MGFX format, which recompiles each individual D3D shader in the effect into a custom format that can then be interpreted by MonoGame appropriately. MGFX still carries on in MonoGame, and for a while it carried on in FNA as well, but various technical issues on top of incompatibility with the original content made this a really big problem for ports.

One of the reasons 2:45 was my best time wasn't just because of bad setup. It was also because any game with any shaders at all inflated the port time by very large amounts of time. What could have been 2:45 was now 22:45, just because of a single .fx file.

Those of you familiar with porting Direct3D 9 titles to OpenGL might already be familiar with a library called <a href="http://icculus.org/mojoshader/">MojoShader</a>. In short, it's a library that parses and recompiles Direct3D shader binaries into alternate shader formats. Currently all of those formats are various OpenGL shading language versions, but it'd be perfectly feasible to write an emitter for other shader languages as well. It's a great project, certainly for content compatibility and preservation, but this only solved the problem of shaders, not whole effect binaries. A few years ago Ryan wrote some support for very basic effects used in <a href="http://www.shankgame.com/">Shank</a>, but it was, by his own admission, *very* rough, and just plain incorrect in a few places.

Pressured by both usability and accuracy concerns for a port I'm actually still working on, I decided  to take all of my games' effect files and write the effect support for MojoShader myself. The current result can be found <a href="https://github.com/flibitijibibo/MojoShader">here</a>.

With the support now available, and with <a href="https://github.com/flibitijibibo/MojoShader-CS">MojoShader#</a> written, we can now support XNA effects natively in FNA, exactly as they were built by the XNA content pipeline, and even by the DirectX SDK's effect compiler.

With this, I was able to port an Amstrad CPC emulator written in XNA to Linux in 78 seconds, even with the screen shader it uses:

<div style="text-align:center"><iframe width="420" height="315" src="//www.youtube.com/embed/02wn1w53q1E" frameborder="0" allowfullscreen></iframe></div>

Again, it's definitely a huge improvement over the old way!

However, there is always work left to be done for XNA compatibility, particularly for content compatibility. I'm sure there are still a few shaders out there that we need to properly parse, and there are still a few major content types we don't easily support yet. You probably noticed that we're using <a href="http://www.vorbis.com/">Ogg Vorbis</a> and <a href="http://www.theora.org/">Ogg Theora</a> for Song and Video files... unfortunately the XNA MediaPlayer depends on Windows Media Player, and due to both technical and legal reasons, we don't yet support Windows Media formats. This applies to the xWMA format found in XACT WaveBanks as well; you have to recompress with ADPCM to get compressed WaveBanks that work with FNA. These are tough problems to solve, and while I do prefer free codecs, compatibility is still a priority for FNA. If you have any expertise on these formats and would like to contribute something that lets us freely support these formats, please get in touch!

### In Conclusion

The end result of over 2 years of work is a library that not only excels in accurately recreating the XNA runtime, but a library that developers will actually be able to use to port and preserve their games.

90 seconds was my expectation for FNA 1.0, primarily because I'm the developer of FNA and may not always see the bad parts of my tech, particularly since I easily get used to the muck that you may discover when using it. However, even for the guy who wrote FNA, getting a port booting on Linux in less than 2 minutes should scale pretty well for a newcomer, right?

If you're eager to see FNA in action for your own game, be sure to check out the FNA wiki to help you get started with your port:

<a href="https://github.com/flibitijibibo/FNA/wiki">https://github.com/flibitijibibo/FNA/wiki</a>
