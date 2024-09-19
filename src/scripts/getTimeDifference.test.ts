import { describe, expect, it } from "vitest";
import { getTimeDifference } from "./getTimeDifference";

describe("getTimeDifference", () => {
    it("should return the time in seconds", () => {
        const now = new Date();
        const result = getTimeDifference(now.setSeconds(now.getSeconds() - 10));
        expect(result).toMatch(/[0-9]*\ssecondes?/gm);
    });
    it("should return the time in minutes", () => {
        const now = new Date();
        const result = getTimeDifference(now.setMinutes(now.getMinutes() - 10));
        expect(result).toMatch(/[0-9]*\sminutes?/gm);
    });
    it("should return the time in hours", () => {
        const now = new Date();
        const result = getTimeDifference(now.setHours(now.getHours() - 10));
        expect(result).toMatch(/[0-9]*\sheures?/gm);
    });
    it("should return the time in Date", () => {
        const now = new Date();
        const result = getTimeDifference(now.setDate(now.getDate() - 1));
        expect(result).toStrictEqual(now.toLocaleDateString());
    });
    it("should return 'Invalid date'", () => {
        const result = getTimeDifference(NaN);
        expect(result).toStrictEqual("Invalid date");
    });
});
