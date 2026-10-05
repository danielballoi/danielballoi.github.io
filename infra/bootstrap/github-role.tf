locals {
  github_repo    = "danielballoi/danielballoi.github.io"
  github_repo_id = "danielballoi@88150270/danielballoi.github.io@1392908825"
  state_key      = "main/terraform.tfstate"
}

data "aws_iam_policy_document" "github_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${local.github_repo_id}:ref:refs/heads/main",
        "repo:${local.github_repo_id}:pull_request",
        "repo:${local.github_repo}:ref:refs/heads/main",
        "repo:${local.github_repo}:pull_request",
      ]
    }
  }
}

resource "aws_iam_role" "github_actions" {
  name                 = "github-actions-portfolio"
  description          = "Ruolo usato da GitHub Actions (OIDC) per Terraform del portfolio"
  assume_role_policy   = data.aws_iam_policy_document.github_trust.json
  max_session_duration = 3600
}

data "aws_iam_policy_document" "github_permissions" {
  statement {
    sid       = "ListaStateMain"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.state.arn]
    condition {
      test     = "StringLike"
      variable = "s3:prefix"
      values   = ["main/*"]
    }
  }

  statement {
    sid     = "LeggiScriviStateMain"
    actions = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = [
      "${aws_s3_bucket.state.arn}/${local.state_key}",
      "${aws_s3_bucket.state.arn}/${local.state_key}.tflock",
    ]
  }
  statement {
    sid     = "GestioneBucketMedia"
    actions = ["s3:*"]
    resources = [
      "arn:aws:s3:::danielballoi-portfolio-media-576134963750",
      "arn:aws:s3:::danielballoi-portfolio-media-576134963750/*",
    ]
  }

  statement {
    sid = "GestioneCloudFront"
    actions = [
      "cloudfront:CreateDistribution",
      "cloudfront:GetDistribution",
      "cloudfront:GetDistributionConfig",
      "cloudfront:UpdateDistribution",
      "cloudfront:DeleteDistribution",
      "cloudfront:TagResource",
      "cloudfront:UntagResource",
      "cloudfront:ListTagsForResource",
      "cloudfront:CreateOriginAccessControl",
      "cloudfront:GetOriginAccessControl",
      "cloudfront:UpdateOriginAccessControl",
      "cloudfront:DeleteOriginAccessControl",
      "cloudfront:ListCachePolicies",
      "cloudfront:GetCachePolicy",
      "cloudfront:CreateInvalidation",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "github_actions" {
  name   = "terraform-state-main"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.github_permissions.json
}
