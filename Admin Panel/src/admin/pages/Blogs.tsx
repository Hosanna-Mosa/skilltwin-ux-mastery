import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

type Blog = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags?: string[];
  images?: string[];
  publishedAt?: string;
};

const BlogsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Blog>({ title: "", slug: "", excerpt: "", content: "", tags: [], images: [] });
  const [editingId, setEditingId] = useState<string | null>(null);
  const isEdit = useMemo(() => Boolean(editingId), [editingId]);

  const log = (...args: any[]) => {
    // centralized logger for this page
    // eslint-disable-next-line no-console
    console.log("[BlogsPage]", ...args);
  };

  const handleChange = (key: keyof Blog) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    log("field change", { key, value });
    setForm((prev) => ({ ...prev, [key]: value } as Blog));
  };

  const handleListChange = (key: "tags" | "images") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const list = raw.split(",").map((t) => t.trim()).filter(Boolean);
    log("list change", { key, raw, list });
    setForm((prev) => ({ ...prev, [key]: list } as Blog));
  };

  const load = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.fetchBlogs({ page: reset ? 1 : page, limit });
      if (res.success) {
        const raw = (res.data?.data as any[]) || [];
        const normalized = raw.map((x) => ({
          ...x,
          // normalize identifier to _id for consistent usage
          _id: x._id || x.id || x.slug,
          title: x.title ?? "",
          slug: x.slug ?? x._id ?? x.id ?? "",
          excerpt: x.excerpt ?? x.description ?? "",
          content: x.content ?? x.body ?? "",
          tags: Array.isArray(x?.tags) ? x.tags : Array.isArray(x?.tagList) ? x.tagList : [],
          images: Array.isArray(x?.images) ? x.images : Array.isArray(x?.imageUrls) ? x.imageUrls : [],
        })) as Blog[];
        setItems((prev) => (reset ? normalized : [...prev, ...normalized]));
        setHasMore(Boolean(res.data?.hasMore));
        setPage((p) => (reset ? 1 : p));
      } else {
        toast({ title: "Failed to load blogs", description: res.error, variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpenCreate = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", tags: [], images: [] });
    setEditingId(null);
    log("open create modal");
    setOpen(true);
  };

  const save = async () => {
    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    // sanitize and trim payload; never send _id in body
    const payload = {
      title: String(form.title).trim(),
      slug: String(form.slug).trim(),
      excerpt: String(form.excerpt).trim(),
      content: String(form.content).trim(),
      tags: (form.tags || []).map((t) => String(t).trim()).filter(Boolean),
      images: (form.images || []).map((u) => String(u).trim()).filter(Boolean),
      publishedAt: form.publishedAt,
    } as Omit<Blog, "_id">;
    const identifier = (editingId || "").toString();
    log("submit", { isEdit, identifier, editingId, payload });
    let res;
    try {
      res = isEdit && identifier
        ? await api.updateBlog(identifier, payload)
        : await api.createBlog(payload);
      log("response", res);
    } catch (err) {
      log("request error", err);
      toast({ title: "Save failed", description: err instanceof Error ? err.message : String(err), variant: "destructive" });
      return;
    }
    if (res.success) {
      toast({ title: isEdit ? "Blog updated" : "Blog created" });
      // optimistic local update for immediate UI reflection
      if (isEdit && editingId) {
        setItems((prev) => prev.map((x) => (x._id === editingId ? { ...x, ...payload } as Blog : x)));
      }
      setOpen(false);
      setItems([]);
      setPage(1);
      await load(true);
    } else {
      toast({ title: "Save failed", description: res.error, variant: "destructive" });
    }
  };

  const edit = (b: Blog) => {
    const next = { ...b, tags: b.tags || [], images: b.images || [] } as Blog;
    setForm(next);
    const id = b._id || b.slug || null;
    setEditingId(id);
    log("open edit modal", { id, item: next });
    setOpen(true);
  };

  const remove = async (b: Blog) => {
    if (!b._id) return;
    const res = await api.deleteBlog(b._id);
    if (res.success) {
      toast({ title: "Blog deleted" });
      setItems((prev) => prev.filter((x) => x._id !== b._id));
    } else {
      toast({ title: "Delete failed", description: res.error, variant: "destructive" });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Blogs</CardTitle>
          <Button onClick={onOpenCreate}>New Blog</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Images</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((b) => (
                <TableRow key={b._id}>
                  <TableCell className="font-medium">{b.title}</TableCell>
                  <TableCell>{b.slug}</TableCell>
                  <TableCell>{(b.tags || []).join(", ")}</TableCell>
                  <TableCell>{(b.images || []).length}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" onClick={() => edit(b)}>Edit</Button>
                    <Button variant="destructive" onClick={() => remove(b)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button disabled={loading} onClick={() => load(false)}>
                {loading ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Blog" : "New Blog"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={form.title} onChange={handleChange("title")} />
            </div>
            <div>
              <label className="text-sm font-medium">Slug</label>
              <Input value={form.slug} onChange={handleChange("slug")} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Excerpt</label>
              <Input value={form.excerpt} onChange={handleChange("excerpt")} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea rows={8} value={form.content} onChange={handleChange("content")} />
            </div>
            <div>
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input
                value={(form.tags || []).join(", ")}
                onChange={handleListChange("tags")}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Images (comma separated URLs)</label>
              <Input
                value={(form.images || []).join(", ")}
                onChange={handleListChange("images")}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{isEdit ? "Update" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogsPage;


