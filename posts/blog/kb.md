---
title: 'Stack이란?'
posttitle: 'Stack이란? (with TypeScript)'
date: '2022-07-07 08:20:00'
updated: '2023-03-15 15:00:00'
uid: '79'
---

## 스택(Stack)이란?

스택은 한쪽 끝에서만 데이터의 추가와 삭제가 가능한 단일구조 형식의 자료구조이다.

스택에 데이터를 집어넣는 것을 `push`라고 하고, 데이터를 빼는 것을 `pop`이라고 한다. `pop` 연산을 하면 가장 나중에 들어간 데이터가 먼저 나오며, 처음에 집어넣은 데이터가 가장 마지막에 나오게 된다. 이와 같은 구조를 후입선출 (LIFO; Last In, First Out) 구조라고 한다.[^1]

## 스택의 연산

- **push** - 스택에 데이터를 집어넣는 함수

```text
push(stack, top, value) → void
    Pre: stack = 스택으로 사용되는 배열
           top = 데이터를 집어넣을 위치 (0-based index)
         value = 집어넣을 데이터
    Post: 스택에 새로운 데이터를 집어넣는데 성공

    stack[top++] ← val;
END
```

- **pop** - 스택에서 데이터를 빼는 함수

```text
pop(stack, top) → T | undefined
    Pre: stack = 스택으로 사용되는 배열
           top = 데이터를 집어넣을 위치 (0-based index)
    Post: 스택에서 최근에 집어넣은 데이터를 삭제하는데 성공

    val ← stack[--top]
    return val
END
```

- **isEmpty** - 스택이 비어있는지 확인하는 함수

```text
isEmpty(stack, top) → boolean
    Pre: stack = 스택으로 사용되는 배열
           top = 데이터를 집어넣을 위치 (0-based index)
    Post: 스택이 비어있다면 true를 아니면 false를 반환

    return top == 0
END
```

- **peek** - 스택 가장 위(top)에 있는 데이터를 확인하는 함수

```text
peek(stack, top) → T | undefined
    Pre: stack = 스택으로 사용되는 배열
           top = 데이터를 집어넣을 위치 (0-based index)
    Post: 스택에 마지막으로 삽입된 데이터를 반환

    return stack[top - 1]
END
```

## 스택의 구현 방법

데이터의 크기가 고정되어 있다면 배열을 사용하여 정적 스택을 구현할 수 있다. 반대로 데이터의 크기가 가변적인 경우, 연결 리스트를 사용하여 동적 스택을 구현할 수 있다.

### 정적 스택 - Array

```typescript
export class StackArray<T> {
  size: number;
  top: number;
  stack: (T | undefined)[];

  constructor(size: number) {
    this.size = size;
    this.top = 0;
    this.stack = new Array<T | undefined>(size);

    if(Object.seal) {
      this.stack.fill(undefined);
      Object.seal(this.stack);
    }
  }

  push(val: T): void {
    if(this.top >= this.size) {
      throw new Error('Stack overflow');
    }

    this.stack[this.top] = val;
    this.top += 1;
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }

    this.top -= 1;
    let val = this.stack[this.top];
    return val;
  }

  isEmpty(): boolean {
    return this.top === 0;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    return this.stack[this.top - 1];
  }
}
```

### 동적 스택 - Linked List

위에서 Array를 사용했지만, 사실 JavaScript의 Array는 HashMap으로 구현되어 있기 때문에 길이에 제한이 없다. 그래서 Array로 동적인 스택을 구현할 수 있다[^a]. 하지만 여기서는 연결리스트를 따로 만들어서[^b] 동적인 스택을 구현했다.

```ts
import { ListNode, LinkedListNode } from '../linked-list/LinkedList';

export class StackList<T> {
  top: ListNode<T>;

  constructor(value: T | null = null) {
    if (value) {
      this.top = new LinkedListNode(value);
    } else {
      this.top = null;
    }
  }

  isEmpty(): boolean {
    return this.top === null;
  }

  push(value: T): void {
    let newNode = new LinkedListNode(value);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop(): ListNode<T> {
    let poppedNode = this.top;

    if (this.top) {
      this.top = this.top.next;
    }

    return poppedNode;
  }

  peek(): ListNode<T> {
    if (this.top) {
      return this.top;
    } else {
      return null;
    }
  }
}
```

## 정적 스택과 동적 스택 각각의 장단점

정적 스택의 경우 스택의 크기가 고정되어 있기 때문에 스택이 가득 차버리면 더 이상 데이터를 추가할 수 없다. 하지만 구현이 간단하고 따로 메모리 할당이 필요하지 않기 때문에 메모리 사용량이 적다는 장점이 있다.

동적 스택의 경우 크기가 고정되어 있지 않다. 그래서 데이터가 갑자기 늘어도 메모리가 허용하는 한 스택에 전부 집어넣을 수 있다. 하지만 동적 스택은 상대적으로 구현이 복잡하고 메모리 할당 또한 필요하기 때문에 메모리 사용량이 늘어나게 된다.

## 스택의 사용사례

- 재귀 알고리즘[^c] [^d]
- 웹 브라우저 방문기록 (뒤로가기)
- 실행 취소 (undo)
- 수식의 괄호 검사 [^e]
- 후위 표기법 (postfix) 계산 [^f]

[^1]: 선입후출 (FILO; First-In, Last-Out)이라고 부르기도 한다.
[^a]: [TypeScript로 구현한 스택 - Array](https://github.com/bprsstnt/typescript-algorithms/blob/main/src/data-structures/stack-array/StackDynamicArray.ts)
[^b]: [TypeScript로 구현한 Linked List](https://github.com/bprsstnt/typescript-algorithms/blob/main/src/data-structures/linked-list/LinkedList.ts)
[^c]: 팩토리얼 구현 문제 - https://www.acmicpc.net/problem/10872
[^d]: 피보나치 구현 문제 - https://www.acmicpc.net/problem/10870
[^e]: 괄호 검사 문제 - https://www.acmicpc.net/problem/4949
[^f]: 후위 표기식 문제 - https://www.acmicpc.net/problem/1918