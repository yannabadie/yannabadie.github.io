declare namespace App {
  interface Locals {
    /** Set by a case-study page so <Src /> and <Flow /> can build README links. */
    project?: { title: string; repo: string; readmeSha: string; lastPush: Date };
  }
}
