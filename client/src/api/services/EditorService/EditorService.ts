import { Observable, Subject } from "rxjs";

type TEditorState = "LIVE" | "DRAFT" | "LOADING";
type TEditorContent = string;

class EditorService {
  public editorState$: Subject<TEditorState>;
  public editorContent$: Subject<TEditorContent>;

  constructor() {
    this.editorState$ = new Subject();
    this.editorContent$ = new Subject();
  }

  onEditorState(): Observable<TEditorState> {
    return this.editorState$.asObservable();
  }

  onEditorContent(): Observable<TEditorContent> {
    return this.editorContent$.asObservable();
  }

  setEditorState(nextState: TEditorState): void {
    this.editorState$.next(nextState);
  }

  setEditorContent(nextState: TEditorContent): void {
    this.editorContent$.next(nextState);
  }
}

const editorServiceSingleton = new EditorService();
Object.freeze(editorServiceSingleton);

export { EditorService, editorServiceSingleton };
