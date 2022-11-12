import * as yup from "yup";
import { ObjectShape } from "yup/lib/object";
import { AnyObject, Maybe } from "yup/lib/types";

yup.addMethod<yup.StringSchema>(yup.string, "emptyAsUndefined", function () {
   return this.transform((value) => (value ? value : undefined));
});

yup.addMethod<yup.StringSchema>(yup.string, "exceptSpecialCharacter", function (message: string) {
   const REGEX_EXCEPT_SPECIAL_CHARACTER =
      /^[a-zA-Z0-9_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/;

   return this.matches(REGEX_EXCEPT_SPECIAL_CHARACTER, message);
});

yup.addMethod<yup.NumberSchema>(yup.number, "emptyAsUndefined", function () {
   return this.transform((value, org) => (org ? value : undefined));
});

yup.addMethod(yup.object, "unique", function (field: string, message: string) {
   return this.test("unique", message, function validateUnique(curUoM) {
      const otherUoM = this.parent.filter((uom: any) => uom !== curUoM);
      const isDuplicate = otherUoM.some(
         (otherUoM: any) =>
            otherUoM[field] && otherUoM[field].toUpperCase() === curUoM?.[field]?.toUpperCase()
      );

      return isDuplicate ? this.createError({ path: `${this.path}.${field}` }) : true;
   });
});

declare module "yup" {
   interface StringSchema<
      TType extends Maybe<string> = string | undefined,
      TContext extends AnyObject = AnyObject,
      TOut extends TType = TType
   > extends yup.BaseSchema<TType, TContext, TOut> {
      emptyAsUndefined(): StringSchema<TType, TContext>;
      exceptSpecialCharacter(message: string): StringSchema<TType, TContext>;
   }

   interface NumberSchema<
      TType extends Maybe<number> = number | undefined,
      TContext extends AnyObject = AnyObject,
      TOut extends TType = TType
   > extends yup.BaseSchema<TType, TContext, TOut> {
      emptyAsUndefined(): NumberSchema<TType, TContext>;
   }

   interface ArraySchema<T> {
      unique(message?: any, mapper?: any): ArraySchema<T>;
   }

   interface ObjectSchema<TShape extends ObjectShape, TContext extends AnyObject = AnyObject> {
      unique(field: string, message?: string): ObjectSchema<TShape, TContext>;
   }
}

export default yup;
