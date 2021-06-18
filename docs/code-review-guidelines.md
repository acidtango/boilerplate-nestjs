# Code Review Guidelines

These guidelines are extracted from the [Gitlab's Code Review Guidelines](https://docs.gitlab.com/ee/development/code_review.html).

- [Best practices](#best-practices)
- [Having your code reviewed](#having-your-code-reviewed)
- [Reviewing code](#reviewing-code)

## Best practices

Be kind.

Accept that many programming decisions are opinions. Discuss tradeoffs, which you prefer, and reach a resolution quickly.

Ask questions; don’t make demands. (“What do you think about naming this :user_id?”)

Ask for clarification. (“I didn’t understand. Can you clarify?”)

Avoid selective ownership of code. (“mine”, “not mine”, “yours”)

Avoid using terms that could be seen as referring to personal traits. (“dumb”, “stupid”). Assume everyone is intelligent and well-meaning.

Be explicit. Remember people don’t always understand your intentions online.

Be humble. (“I’m not sure - let’s look it up.”)

Don’t use hyperbole. (“always”, “never”, “endlessly”, “nothing”)

Be careful about the use of sarcasm. Everything we do is public; what seems like good-natured ribbing to you and a long-time colleague might come off as mean and unwelcoming to a person new to the project.

Consider one-on-one chats or video calls if there are too many “I didn’t understand” or “Alternative solution:” comments. Post a follow-up comment summarizing one-on-one discussion.

If you ask a question to a specific person, always start the comment by mentioning them; this will ensure they see it if their notification level is set to “mentioned” and other people will understand they don’t have to respond.

## Having your code reviewed

The first reviewer of your code is you. Before you perform that first push of your shiny new branch, read through the entire diff. Does it make sense? Did you include something unrelated to the overall purpose of the changes? Did you forget to remove any debugging code?

Be grateful for the reviewer’s suggestions. (“Good call. I’ll make that change.”)

Don’t take it personally. The review is of the code, not of you.

Explain why the code exists. (“It’s like that because of these reasons. Would it be more clear if I rename this class/file/method/variable?”)

Don't be defensive. There sure is an explanation why you made a mistake, but we're here to solve it, not to blame external factors. Too many explanations on the 'why did this happen?' might make the 'how are we going to solve it?' less readable.

Seek to understand the reviewer’s perspective.

Try to respond to every comment.

Let the reviewer select the “Resolve discussion” buttons.

Push commits based on earlier rounds of feedback as isolated commits to the branch. Reviewers should be able to read individual updates based on their earlier feedback.

## Reviewing code

Understand why the change is necessary (fixes a bug, improves the user experience, refactors the existing code). Then:

Try to be thorough in your reviews to reduce the number of iterations.

Communicate which ideas you feel strongly about and those you don’t.

Identify ways to simplify the code while still solving the problem.

Offer alternative implementations, but assume the author already considered them. (“What do you think about using a custom validator here?”)

Seek to understand the author’s perspective.

If you don’t understand a piece of code, say so. There’s a good chance someone else would be confused by it as well.

After a round of line notes, it can be helpful to post a summary note such as “LGTM :thumbsup:”, or “Just a couple things to address.”

Avoid accepting a pull request before the job succeeds.