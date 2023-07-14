export class ValidateAddress {
  private removePunctuation(text: string): string {
    return text.replace(/[^\w\s]/g, "");
  }
  stringsMatch(str1: string, str2: string): boolean {
    str1 = this.removePunctuation(str1).toLowerCase();
    str2 = this.removePunctuation(str2).toLowerCase();

    const list1 = str1.split(" ");
    const list2 = str2.split(" ");

    return list1.every((word) => list2.includes(word));
  }
}
