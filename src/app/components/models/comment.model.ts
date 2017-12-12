export class CommentModel {
  constructor(
    public articleId: string,
    public content: string,
    public author: string,
    public date: Date
  ) { }
}
