---
layout:     post
title:      "Don't Fork Us on GitHub"
date:       2014-12-29
# published:  false
author:     Ethan "flibitijibibo" Lee
---

You'll notice that on the left, we've got a giant button with the <a href="https://octodex.github.com/">Octocat</a> and the text "Clone on GitHub". You're probably familiar with these by now... just about every project out there has <a href="https://github.com/blog/273-github-ribbons">"Fork Us" tab</a> somewhere on the site. But we decided to go with "Clone" instead, and for a very important reason.

Let's talk about "forking" a project. Back in the day, this was a pretty big deal:

<a href="http://en.wikipedia.org/wiki/Fork_%28software_development%29">http://en.wikipedia.org/wiki/Fork_(software_development)</a>

>The term often implies not merely a development branch, but a split in the developer community, a form of schism.

Sounds kind of dramatic, but the point remains: forking, as opposed to branching, is essentially taking a project and using it as a base to develop either an entirely new project or to develop a similar project with a radically different approach.

FNA is actually one example of this - FNA originally started as a branch of MonoGame called "MonoGame-SDL2", where I cut out the OpenTK GamePlatform implementation and replaced it with an implementation using <a href="https://github.com/flibitijibibo/SDL2-CS">SDL2#</a>, a thin C# wrapper around <a href="http://www.libsdl.org/">SDL2</a> that I wrote (with the help of <a href="http://davidgow.net/">David Gow</a>) for the express purpose of fixing MonoGame's desktop support.

A year after starting development of MG-SDL2, and after many months of careful consideration, I decided to fully fork the project in order to fulfill some goals I had for XNA preservation and portability, in exchange for taking reponsibility for the entire source tree, rather than just a handful of files that related to the SDL2 backend. This is how MonoGame-SDL2 became FNA, the project you see today.

There were many long-term factors to consider in making FNA and MonoGame separate entities. MonoGame is setting out to be what is essentially the elusive XNA 5.0, succeeding Microsoft's now-discontinued XNA Game Studio. In doing this, however, there will be a point where they have to start breaking things, whether it's to make the API better for newer graphics and platform technologies, improving the content formats, or adding/removing features entirely. That's a perfectly reasonable thing to do, and they should be able to make these kinds of changes to make the project better for developers.

But this puts XNA games in a tough position. While it's possible to just upgrade as you might have with XNA 3.1 to XNA 4.0, for example, there is still a reasonable demand for XNA 4.0 compatibility and accuracy, even if XNA 4.0 itself has its problems and even considering the eventual obsoletion of XNA 4.0. You're left with a lose-lose scenario: Either upgrade to MonoGame and potentially break your game in the process, or stay with XNA 4.0 and hope it never gets broken merely by old age (and if Windows 8 was an indicator, that will <i>not</i> be a long time).

FNA sets out to fill that gap. FNA intends to preserve XNA 4.0 and the games that use it by retaining compatibility with the source code and content for those games, while also maintaining compatibility with modern (and open) operating systems, so that these games can still be played long after XNA is unusable, and can be played wherever a developer is allowed to target without being concerned about extra licenses and walled gardens, two things that have been plaguing popular game technologies today. My hope is that by having this project, XNA developers can avoid having to worry about losing their products as a result of time alone, and the MonoGame team can focus more on succeeding XNA without the various costs of XNA compatibility, at the MonoGame project's expense.

Compare this to, say, the <i>mojoshader-cs</i> branch that's currently on our GitHub repository. You can view the current diffs here:

<a href="https://github.com/flibitijibibo/FNA/pull/269">MojoShader# Pull Request</a>

It's a large changeset, but it's not necessarily a <i>huge</i> deal. Effectively, it's just a rewrite of the Effect implementation, moving from MonoGame's MGFX shader format to something that can read and use the original D3D Effect binaries that the XNA content pipeline built.

And that's a pretty large example of a pull request on GitHub. Compare that to, say, something like one of SDL2#'s pull requests:

<a href="https://github.com/flibitijibibo/SDL2-CS/pull/79/files">Typical SDL2# Pull Request</a>

Pretty amazing, huh? And the way contributors make these pull requests is by... "forking" on GitHub.

Wait, what? You mean to tell me that you have to do a process like what I did with FNA just to make these small patches?

Well, of course not. That's just what GitHub calls it, because when you click the "fork" button, you get what appears to be a whole new copy of the source in your GitHub account. But what this is much closer to is "branching", not "forking". (And to my understanding, this is what's actually happening behind the scenes in GitHub's infrastructure anyway.)

And to be fair, in a way this <i>is</i> like forking, as many people who fork things on GitHub take a dramatically different approach to the upstream development process; that is, they take the approach of not developing the software at all. Have a look at SDL2#'s <i>43 different forks</i> (as of writing) on GitHub:

<a href="https://github.com/flibitijibibo/SDL2-CS/network">SDL2# Network</a>

Pretty amazing, isn't it?

The first thing you'll notice is that there are only about 9 names, out of the 43 that GitHub has tracked. That's because the other 34 went to the trouble of forking the entire repository, only to do nothing with it. For some reason.

And keep in mind, this is a <i>small</i> case. Let's look at the MonoGame network, which has, and I'm not kidding here, <b>1,402 different forks on GitHub</b> (again, as of writing):

<a href="https://github.com/mono/MonoGame/network">MonoGame Network</a>

Oh, right. GitHub can't even process that many forks. So again, I ask: How many <i>actual forks<i> do you think there are of MonoGame on GitHub? Does anyone really think there are over a thousand projects like FNA out there? Seriously?

So let's get back to the topic of why you see "Clone" on the left of this page. As noted in the <a href="https://github.com/flibitijibibo/FNA/wiki">FNA documentation</a>, you will be typing this command in before anything else (assuming you are not downloading a stable release from this site):

{% highlight c# %}
git clone --recursive git://github.com/FNA-XNA/FNA.git
{% endhighlight %}

When you do this, you are essentially doing the same thing as the "fork" button on GitHub, without the unnecessary repository on your account. You can keep that branch locally forever, without every having to connect to remote ever again. You can even make local commits, again, without ever contacting a server. That branch is your branch.

But that's not exactly why I'm so fussy about forks. That sort of freedom is important for developers to have, and it's why <a href="http://en.wikipedia.org/wiki/Distributed_revision_control">DVCS</a> is superior to alternatives like SVN, where you <i>must</i> be tied to a single repository. However, this is the part where I argue that <b>just because you <i>can</i> cut yourself off from a project's community, doesn't mean you <i>should</i></b>. The point is, I <i>want</i> developers to communicate with us. I <i>want</i> developers to tell us when something's wrong, or if something could be better, and I would <i>love</i> to have developers become code contributors and send us patches when they make them. When that time comes, sure, make the "fork" so that we can establish an official pull request, and then I can merge it. And when it works, I <i>will</i> merge it.

The whole idea behind FOSS is not that it's <i>my</i> project, or a project that you have to somehow <i>make yours</i>. Free, open source software is supposed to be <i>our</i> software. It's yours just as much as it is mine, and the whole idea of sharing is that we all have the one good project, and not hundreds of mediocre ones, all of which are mediocre for slightly different reasons.

If you feel that you have a totally different vision for XNA4 preservation, or would like to use FNA in a totally different way, then by all means, Fork Us on GitHub(TM). If not, I encourage you to become a part of the FNA community and just clone us from GitHub instead.
